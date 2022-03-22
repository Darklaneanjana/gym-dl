const joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
let trainers = require("../models/trainers");
const { loginValidation, registerValidation } = require("../models/validation");
const bcrypt = require("bcryptjs");

const loginTrainers = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const emailExist = await trainers.findOne({ email: req.body.email });
  if (!emailExist)
    return res.status(400).send("Email or password is incorrect");
  const validPass = await bcrypt.compare(
    req.body.password,
    emailExist.password
  );
  if (!validPass) return res.status(400).send("Password is incorrect");
  const token = jwt.sign(
    { _id: emailExist._id, type: "T" },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).send(token);
};

const getTrainer = async (req, res) => {
  console.log(req.params.id);
  try {
    const trainer = await trainers.findById(req.params.id);
    res.status(200).json({ success: true, data: trainer });
  } catch (err) {
    res.status(404).json({ success: false, msg: err });
  }
};

const getTrainers = async (req, res) => {
  try {
    const trainer = await trainers.find();
    res.status(200).json({ success: true, data: trainer });
  } catch (err) {
    res.status(404).json({ success: false, msg: err });
  }
};

const createTrainers = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, msg: error.details[0].message });

  const emailExist = await trainers.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(400)
      .json({ success: false, msg: "Email already exists" });
  const nicExist = await trainers.findOne({ nic: req.body.nic });
  if (nicExist)
    return res.status(400).json({ success: false, msg: "NIC already exists" });
  const uNameExist = await trainers.findOne({ uName: req.body.uName });
  if (uNameExist)
    return res
      .status(400)
      .json({ success: false, msg: "Username already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const trainer = new trainers({
    fName: req.body.fName,
    lName: req.body.lName,
    uName: req.body.uName,
    nic: req.body.nic,
    dob: req.body.dob,
    email: req.body.email,
    gender: req.body.gender,
    address: req.body.address,
    pNumber: req.body.pNumber,
    Qualifications: req.body.Qualifications,
    expYears: req.body.expYears,
    password: hashedPassword,
  });

  try {
    const savedTrainer = await trainer.save();
    res.status(201).send({
      successs: true,
      trainer: savedTrainer,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err });
  }
};

const updateTrainers = async (req, res) => {
  try {
    const updatedTrainer = await trainers.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({ success: true, data: updatedTrainer });
  } catch (err) {
    res.status(404).json({ success: false, msg: err });
  }
};

const deleteTrainers = async (req, res) => {
  try {
    const removeTrainer = await trainers.remove({ _id: req.params.id });
    return res.status(200).json({ success: true, data: removeTrainer });
  } catch (err) {
    res.status(404).json({ success: false, msg: err });
  }
};

module.exports = {
  loginTrainers,
  getTrainer,
  getTrainers,
  createTrainers,
  updateTrainers,
  deleteTrainers,
};
