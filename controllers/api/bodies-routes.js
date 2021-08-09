const router = require("express").Router();
const { Bodies } = require("../../models");

router.get("/:name", async (req, res) => {
  try {
    const body = await Bodies.findOne({
      where: {
        name: req.params.name,
      },
    });

    // if (!body) {
    //   res.render("404")
    //   res.status(404).json({ message: "No space body found with this name!" });
    //   return;
    // }

    const myBody = body.get({ plain: true });
    res.render("searched-body", {
      ...myBody,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).render("404blank", {layout:"404.handlebars",loggedIn: req.session.loggedIn});
  }
});

module.exports = router;



module.exports = router;