const router = require("express").Router();
const { Bodies } = require("../../models");

router.get("/:name", async (req, res) => {
  try {
    const body = await Bodies.findOne({
      where: {
        name: req.params.name,
      },
    });

    if (!body) {
      res.status(404).json({ message: "No space body found with this name!" });
      return;
    }

    const myBody = body.get({ plain: true });
    res.render("searched-body", {
      ...myBody,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
