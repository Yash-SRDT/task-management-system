import db from "../config/firebase.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

const USERS_COLLECTION = "users";

/* ================= GET ALL USERS (ADMIN) ================= */
export const getAllUsers = async (req, res) => {
  try {
    const { role } = req.user;

    // Optional: restrict only admin
    if (role !== "admin") {
      return errorResponse(res, {
        statusCode: 403,
        message: "Access denied",
      });
    }

    const snapshot = await db.collection(USERS_COLLECTION).orderBy("createdAt", "desc").get();

    const users = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        role: data.role,
        createdAt: data.createdAt?.toDate(),
      };
    });

    return successResponse(res, {
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};
