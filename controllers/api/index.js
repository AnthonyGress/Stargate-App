const router = require("express").Router();

const userRoutes = require("./user-routes");
const bodyRoutes = require("./bodies-routes");
// const commentRoutes = require("./comment-routes");

// /api routes

router.use("/user", userRoutes);
router.use("/body", bodyRoutes);
// router.use("/comment", commentRoutes);

module.exports = router;
