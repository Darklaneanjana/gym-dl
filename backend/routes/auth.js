const router = require("express").Router();
router.get("/", (req, res) => {
  res.send("get");
});
router.post("/register", (req, res) => {
  res.send("register");
});
router.post("/login", (req, res) => {
  res.send("login");
});

module.exports = router;
