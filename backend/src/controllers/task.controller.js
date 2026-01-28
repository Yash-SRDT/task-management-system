import db from "../config/firebase.js";

const TASKS = "tasks";
const USERS = "users";

/**
 * ADMIN: Create Task
 */
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedUserId } = req.body;

    if (!title || !description || !assignedUserId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userDoc = await db.collection(USERS).doc(assignedUserId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "Assigned user not found" });
    }

    const assignedUserName = userDoc.data().name;

    const task = {
      title,
      description,
      status: "Pending",
      assignedUserId,
      assignedUserName,
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

    res.status(201).json({
      message: "Task created successfully",
      taskId: docRef.id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN: Get All Tasks
 */
export const getAllTasks = async (req, res) => {
  try {
    const snapshot = await db.collection(TASKS).orderBy("createdAt", "desc").get();

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * USER: Get My Tasks
 */
export const getMyTasks = async (req, res) => {
  try {
    const { userId, role } = req.user;

    let query = db.collection(TASKS);

    if (role === "user") {
      query = query.where("assignedUserId", "==", userId);
    }

    const snapshot = await query.orderBy("createdAt", "desc").get();

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN / USER: Get Task by ID
 */
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;

    const doc = await db.collection(TASKS).doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    const task = doc.data();

    if (role === "user" && task.assignedUserId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ id: doc.id, ...task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN / USER: Update Task Status
 */
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { userId, role } = req.user;

    if (!["Pending", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const ref = db.collection(TASKS).doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    const task = doc.data();

    if (role === "user" && task.assignedUserId !== userId) {
      return res.status(403).json({ message: "Access denied" });
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

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN: Update Task (Edit)
 */
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assignedUserId } = req.body;

    const ref = db.collection(TASKS).doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    const task = doc.data();
    let updates = { title, description };

    if (assignedUserId && assignedUserId !== task.assignedUserId) {
      const userDoc = await db.collection(USERS).doc(assignedUserId).get();
      if (!userDoc.exists) {
        return res.status(404).json({ message: "Assigned user not found" });
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

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN: Delete Task
 */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const ref = db.collection(TASKS).doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    await ref.delete();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
