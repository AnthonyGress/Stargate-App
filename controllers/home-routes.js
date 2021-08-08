// home page shows all posts
const router = require("express").Router();
const { Comment, Bodies, User } = require("../models");
const fetch = require("node-fetch");
// / routes

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});
router.get("/solar-system", async (req, res) => {
  try {
    const body = await Bodies.findAll({
      where: { id: [163, 167, 166, 162, 201, 164, 200, 198, 199] },
    });

    if (!body) {
      res.status(404).json({ message: "Where is our galaxy!?!?" });
      return;
    }
    // const galaxyData = await Bodies.findAll({ where: { id: myId } });
    // const planet = galaxyData.map((post) => post.get({ plain: true }));
    // // TODO call helper to pull user info and display it on page
    // res.render("solar-system", { planet, layout: "dashboard.handlebars" });
    res.status(200).json(body);
  } catch (err) {
    res.status(500).json(err);
  }
});

// single display
// router.get("/post/:id", async (req, res) => {
//   try {
//     const dbPostData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: Comment,
//           include: [
//             {
//               model: User,
//               attributes: ["username", "id"],
//             },
//           ],
//         },
//         {
//           model: User,
//           attributes: ["username", "id"],
//         },
//       ],
//     });
//     const post = dbPostData.get({ plain: true });
//     res.render("single-post", {
//       ...post,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get("/potd", async (req, res) => {
  try {
    const url =
      "https://api.nasa.gov/planetary/apod?api_key=Y0LfWDWXIyVWrPcCEd0fDNayJjsQ8kxHYBz4NtwA";
    const apod = await get_request(url);
    res.render("featured", {
      ...apod,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

const get_request = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
