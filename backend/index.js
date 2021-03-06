const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.static("./public"));
const events = require("./routes/events.js");
const trainers = require("./routes/trainers.js");
const auth = require("./routes/auth.js");

//////////////////////////////////////////////////////////
app.get("/ll", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});
//authontication test/////////////////////////////////////////////////////////////////////////////////////////////////
const { connect } = require("./routes/events.js");
const path = require("path");
const jwt = require("jsonwebtoken");

app.get("/tet", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/login.html"));
});
app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/tet");
});

const verifyToken = require("./routes/verifyToken");
app.get("/test", verifyToken, (req, res) => {
  console.log(req.user);
  res.send("test");
});
///////////////////////////////////////////////////////////////////////////////////////////////////////

app.use("/api/events", events);
app.use("/api/trainers", trainers);
app.use("/api/auth", auth);
app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));

mongoose
  .connect(process.env.ATLAS_URI, { useNewUrlParser: true })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    const port = process.env.port || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  });
