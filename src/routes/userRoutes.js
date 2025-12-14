const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

//Only Admmin can access this router
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
});

//Both Admiin and manager can access this router
router.get("/teacher", verifyToken, authorizeRoles("admin", "teacher"), (req, res) => {
    res.json({ message: "Welcome Teacher" });
});
// ALl can access this router
router.get("/student", verifyToken, authorizeRoles("admin", "teacher", "student"), (req, res) => {
    res.json({ message: "Welcome Student" });
});
module.exports = router;