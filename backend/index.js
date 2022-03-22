const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

const verifyToken = require("./routes/verifyToken");

app.use(express.static("./public"));
const events = require("./routes/events.js");
const trainers = require("./routes/trainers.js");
const auth = require("./routes/auth.js");
const { connect } = require("./routes/events.js");

app.use("/api/events", events);
app.use("/api/trainers", trainers);
app.use("/api/auth", auth);
app.get("/test", verifyToken, (req, res) => {
  console.log(req.user);
  res.send("test");
});
app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));

const uri = process.env.ATLAS_URI;
const port = process.env.port || 5000;

mongoose
  .connect(uri, { useNewUrlParser: true })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  });
