import db from "../config/firebase.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

const USERS_COLLECTION = "users";

/* ================= SIGNUP ================= */
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, {
        statusCode: 400,
        message: "All fields are required",
      });
    }

    const snapshot = await db.collection(USERS_COLLECTION).where("email", "==", email).get();

    if (!snapshot.empty) {
      return errorResponse(res, {
        statusCode: 409,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const docRef = await db.collection(USERS_COLLECTION).add({
      name,
      email,
      password: hashedPassword,
      role: null,
      createdAt: new Date(),
    });

    return successResponse(res, {
      statusCode: 201,
      message: "Signup successful. Please select role.",
      data: { userId: docRef.id },
    });
  } catch (err) {
    return errorResponse(res, { message: err.message });
  }
};

/* ================= SELECT ROLE ================= */
export const selectRole = async (req, res) => {
  try {
    const { role, userId } = req.body;

    if (!userId || !["admin", "user"].includes(role)) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid role or userId",
      });
    }

    const ref = db.collection(USERS_COLLECTION).doc(userId);
    const doc = await ref.get();

    if (!doc.exists) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    if (doc.data().role) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Role already selected",
      });
    }

    await ref.update({ role });

    return successResponse(res, {
      message: "Role selected successfully. Please login.",
      data: null,
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const snapshot = await db.collection(USERS_COLLECTION).where("email", "==", email).get();

    if (snapshot.empty) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    const doc = snapshot.docs[0];
    const user = doc.data();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: doc.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return successResponse(res, {
      message: "Login successful",
      data: { token },
    });
  } catch (err) {
    return errorResponse(res, { message: err.message });
  }
};

/* ================= GET LOGGED IN USER ================= */
export const getMe = async (req, res) => {
  try {
    const { userId } = req.user;

    const doc = await db.collection(USERS_COLLECTION).doc(userId).get();

    if (!doc.exists) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    const user = doc.data();

    return successResponse(res, {
      message: "User details fetched successfully",
      data: {
        id: doc.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toDate(),
      },
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};
