// home page shows all posts
const router = require("express").Router();
const { Comment, Post, User } = require("../models");

// / routes

router.get("/", async (req, res) => {
  try {
    // const dbPostData = await Post.findAll({
    //   include: [
    //     {
    //       model: User,
    //     },
    //   ],
    // });
    // const posts = dbPostData.map((post) => post.get({ plain: true }));
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
