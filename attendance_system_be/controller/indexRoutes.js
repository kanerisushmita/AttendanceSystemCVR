const express = require("express");
const router = express.Router();

const dashboardRoutes = require("./dashboards");
const loginRoutes = require("./login");
const registerRoutes = require("./registration");
const homeRoutes = require("./home");
const operationsRoutes = require("./operations");
const validateRoutes = require("./validate");
const attendanceRoutes = require("./attendence");

router.use("/api/login", loginRoutes);
router.use("/api/dashboard", dashboardRoutes);
router.use("/api/register", registerRoutes);
router.use("/api/home", homeRoutes);
router.use("/api/operations", operationsRoutes);
router.use("/api/validate", validateRoutes);
router.use("/api/attendence", attendanceRoutes);

module.exports = router;
