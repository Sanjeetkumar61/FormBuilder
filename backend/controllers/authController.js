

import jwt from "jsonwebtoken";


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const ADMIN_NAME = process.env.ADMIN_NAME || "Admin User";

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      return res.status(500).json({
        success: false,
        message: "Admin credentials not configured on server",
      });
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const token = jwt.sign(
      {
        role: "admin",
        email: ADMIN_EMAIL,
        name: ADMIN_NAME,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        email: ADMIN_EMAIL,
        name: ADMIN_NAME,
        role: "admin",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// Get Admin Profile
export const getAdminProfile = async (req, res) => {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_NAME = process.env.ADMIN_NAME || "Admin User";

    res.status(200).json({
      success: true,
      admin: {
        email: ADMIN_EMAIL,
        name: ADMIN_NAME,
        role: "admin",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};