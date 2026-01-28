import db from "../config/firebase.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const USERS_COLLECTION = "users";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const snapshot = await db
      .collection(USERS_COLLECTION)
      .where("email", "==", email)
      .get();

    if (!snapshot.empty) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔴 IMPORTANT PART
    const docRef = await db.collection(USERS_COLLECTION).add({
      name,
      email,
      password: hashedPassword,
      role: null,
      createdAt: new Date(),
    });

    // ✅ RETURN USER ID
    res.status(201).json({
      userId: docRef.id,
      message: "Signup successful. Please select role.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const selectRole = async (req, res) => {
  try {
    const { role, userId } = req.body;

    if (!role || !["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();

    if (userData.role) {
      return res.status(400).json({ message: "Role already selected" });
    }

    await userRef.update({ role });

    res.json({
      message: "Role selected successfully. Please login.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const snapshot = await db.collection(USERS_COLLECTION).where("email", "==", email).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    const doc = snapshot.docs[0];
    const user = doc.data();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: doc.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: {
        id: doc.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getMe = async (req, res) => {
  try {
    const { userId } = req.user; // from JWT

    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userDoc.data();

    res.json({
      id: userDoc.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
