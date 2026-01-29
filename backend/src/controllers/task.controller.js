import db from "../config/firebase.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

const TASKS = "tasks";
const USERS = "users";

/* ================= CREATE TASK ================= */
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedUserId } = req.body;

    if (!title || !description || !assignedUserId) {
      return errorResponse(res, {
        statusCode: 400,
        message: "All fields are required",
      });
    }

    const userDoc = await db.collection(USERS).doc(assignedUserId).get();
    if (!userDoc.exists) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Assigned user not found",
      });
    }

    const task = {
      title,
      description,
      status: "Pending",
      assignedUserId,
      assignedUserName: userDoc.data().name,
      createdBy: "Admin",
      createdAt: new Date(),
      activity: [
        {
          message: "Task created by Admin",
          timestamp: new Date(),
        },
      ],
    };

    const docRef = await db.collection(TASKS).add(task);

    return successResponse(res, {
      statusCode: 201,
      message: "Task created successfully",
      data: { id: docRef.id },
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};

/* ================= GET ALL TASKS (ADMIN) ================= */
export const getAllTasks = async (req, res) => {
  try {
    const snapshot = await db.collection(TASKS).orderBy("createdAt", "desc").get();

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return successResponse(res, {
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};

/* ================= GET MY TASKS (USER) ================= */
export const getMyTasks = async (req, res) => {
  try {
    const { userId } = req.user;

    const snapshot = await db
      .collection(TASKS)
      .where("assignedUserId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return successResponse(res, {
      message: "My tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};

/* ================= GET TASK BY ID ================= */
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;

    const doc = await db.collection(TASKS).doc(id).get();
    if (!doc.exists) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Task not found",
      });
    }

    const task = doc.data();

    if (role === "user" && task.assignedUserId !== userId) {
      return errorResponse(res, {
        statusCode: 403,
        message: "Access denied",
      });
    }

    return successResponse(res, {
      message: "Task fetched successfully",
      data: { id: doc.id, ...task },
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};

/* ================= UPDATE TASK STATUS ================= */
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { userId, role } = req.user;

    if (!["Pending", "In Progress", "Completed"].includes(status)) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid status",
      });
    }

    const ref = db.collection(TASKS).doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Task not found",
      });
    }

    const task = doc.data();

    if (role === "user" && task.assignedUserId !== userId) {
      return errorResponse(res, {
        statusCode: 403,
        message: "Access denied",
      });
    }

    await ref.update({
      status,
      activity: [
        ...task.activity,
        {
          message: `Status updated to ${status} by ${role}`,
          timestamp: new Date(),
        },
      ],
    });

    return successResponse(res, {
      message: "Task status updated successfully",
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};

/* ================= UPDATE TASK (ADMIN) ================= */
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assignedUserId } = req.body;

    const ref = db.collection(TASKS).doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Task not found",
      });
    }

    const task = doc.data();
    const updates = { title, description };

    if (assignedUserId && assignedUserId !== task.assignedUserId) {
      const userDoc = await db.collection(USERS).doc(assignedUserId).get();
      if (!userDoc.exists) {
        return errorResponse(res, {
          statusCode: 404,
          message: "Assigned user not found",
        });
      }

      updates.assignedUserId = assignedUserId;
      updates.assignedUserName = userDoc.data().name;
      updates.activity = [
        ...task.activity,
        {
          message: `Task reassigned to ${userDoc.data().name}`,
          timestamp: new Date(),
        },
      ];
    }

    await ref.update(updates);

    return successResponse(res, {
      message: "Task updated successfully",
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};

/* ================= DELETE TASK ================= */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const ref = db.collection(TASKS).doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Task not found",
      });
    }

    await ref.delete();

    return successResponse(res, {
      message: "Task deleted successfully",
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};
