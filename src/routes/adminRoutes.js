const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

// Admin-only: Create teacher or admin
router.post("/createuser", verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Allowed roles to create
        if (!["admin", "teacher"].includes(role)) {
            return res.status(400).json({ message: "Admin can only create admin or teacher accounts" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });

        await newUser.save();
        res.status(201).json({ message: `${role} created successfully` });

    } catch (err) {
        console.error("ADMIN CREATE USER ERROR:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;
