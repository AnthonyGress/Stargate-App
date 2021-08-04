const router = require("express").Router();
const { User } = require("../../models");

// /api/user routes
module.exports = router;

router.get("/", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// signup route create new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const uid = await dbUserData.dataValues.id;
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.uid = uid;
      res.status(200).json(dbUserData);
    });
    console.log(dbUserData.dataValues.id);
    console.log(req.session);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// login route
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    const uid = await dbUserData.dataValues.id;
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.uid = uid;
      res.status(200).render("homepage", { loggedIn: req.session.loggedIn });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/uid", async (req, res) => {
  const uid = req.session.uid;
  try {
    res.status(200).json(uid);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
