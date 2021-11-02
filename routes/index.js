let express = require("express");
let router = express.Router();

const momentDB = require("../model/momentDB.js");
const bcrypt = require("bcrypt");
const passport = require("passport");

const initializePassport = require("../public/javascripts/passport-config");

initializePassport(
  passport,
  (username) => momentDB.findUser({ username: username }),
  (id) => momentDB.findUser({ id: id })
);

/* GET different page. */
router.get("/", checkAuthenticated, async (req, res) => {
  const loginUser = await req.user;
  res.render("index", { name: loginUser.firstname });
});

router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("signin.ejs");
});

router.get("/signup", checkNotAuthenticated, (req, res) => {
  res.render("signup.ejs");
});

router.get("/home", checkAuthenticated, async (req, res) => {
  const loginUser = await req.user;
  res.render("home.ejs", { name: loginUser.firstname });
});

router.get("/post", checkAuthenticated, async (req, res) => {
  const loginUser = await req.user;
  res.render("post.ejs", { name: loginUser.firstname });
});

router.get("/general", checkAuthenticated, async (req, res) => {
  const loginUser = await req.user;
  res.render("general.ejs", { name: loginUser.firstname });
});

router.get("/momentDB", checkAuthenticated, async (req, res) => {
  try {
    console.log("The DB ", momentDB);
    const files = await momentDB.getFiles();
    res.send({ files: files });
  } catch (e) {
    console.log("Error: ", e);
    res.status(400).send({ err: e });
  }
});

// User sign in
router.post(
  "/signin",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

/* User Sign-Up Request. */
router.post("/signup", checkNotAuthenticated, async (req, res) => {
  try {
    console.log("Creating new user ", req);
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUserData = {
      id: Date.now().toString(),
      username: req.body.username,
      password: hashPassword,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };
    momentDB.createCredential(newUserData);
    console.log(newUserData);
    res.redirect("/login");
  } catch (e) {
    console.log("Error signing up new user: ", e);
    res.redirect("/signup");
  }
});

/* User Log-Out Request. */
router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

/* Get User's homepage to show thier own posts */
router.get("/myPosts", async (req, res) => {
  try {
    console.log("Getting data from db and send it to reload.");
  } catch (e) {
    console.log("Error getting data: ", e);
    res.status(400).send({ err: e });
  }
});

/* Post a new moment to DB */
router.post("/post", async (req, res) => {
  try {
    const loginUser = await req.user;
    console.log("Creating new post for user: ", loginUser.firstname);
    const newPostData = {
      name: loginUser.username,
      title: req.body.title,
      content: req.body.content,
      like: 0,
      comments: {},
    };
    momentDB.createFile(newPostData);
    res.redirect("/general");
    console.log("Create post successful! Redirect...");

    res.sendStatus(200);
  } catch (e) {
    console.error("Error", e);
    res.status(400).send({ err: e });
  }
});

/* Delete a moment */
router.post("/deletePost", async (req, res) => {
  try {
    const username = req.session.username;
    const postId = req.body.post_id;

    await momentDB.deleteFromPosts(username, postId);
    res.sendStatus(200);
  } catch (e) {
    console.error("Error", e);
    res.status(400).send({ err: e });
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = router;
