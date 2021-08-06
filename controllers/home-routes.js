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

router.get("/featured", async (req, res) => {
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
