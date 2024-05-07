const express = require('express');
const router = express.Router();

const dashboardRoutes = require("./dashboards");
const loginRoutes = require("./login");
const registerRoutes = require("./registration");
const homeRoutes = require("./home");
const operationsRoutes = require("./operations");


router.use("/api/login", loginRoutes);
router.use("/api/dashboard", dashboardRoutes);
router.use("/api/register", registerRoutes);
router.use("/api/home", homeRoutes);
router.use("/api/operations", operationsRoutes);

module.exports = router;