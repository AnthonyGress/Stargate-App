const router = require("express").Router();

const apiRoutes = require("./api");
const dashRoutes = require("./dashboard-routes.js");
const homeRoutes = require("./home-routes.js");

router.use("/", homeRoutes);
router.use("/dashboard", dashRoutes);
router.use("/api", apiRoutes);

module.exports = router;
