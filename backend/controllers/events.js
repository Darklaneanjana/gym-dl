const joi = require("@hapi/joi");
let events = require("../models/events");
const { eventValidation } = require("../models/validation");

const searchEvents = async (req, res) => {
  console.log(req.params.id);
  try {
    const event = await events.find({});
  } catch (err) {
    res.status(404).json({ success: false, msg: err });
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await events.findById(req.params.id);
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(404).json({ success: false, msg: err });
  }
};

const getEvents = async (req, res) => {
  try {
    const event = await events.find();
    /////////SEARCH EVENTS BY REGEX(ANYWHERE IN TITLE)//////////
    if (req.query.search) {
      var xt = new RegExp(req.query.search);
      const newEvent = await events.find({ title: xt });
      return res.status(200).json({ success: true, data: newEvent });
    }
    /////////SORT EVENTS BY TRAINER ID//////////
    if (req.query.trainer) {
      const newEvent = event.filter(
        (event) => event.trainer == req.query.trainer
      );
      return res.status(200).json({ success: true, data: newEvent });
    } /////////SEARCH EVENTS BY NAME//////////

    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(404).json({ success: false, msg: err });
  }
};

const createEvents = async (req, res) => {
  const { error } = eventValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, msg: error.details[0].message });
  const event = new events({
    title: req.body.title,
    tags: req.body.tags,
    description: req.body.description,
    details: req.body.details,
    gender: req.body.gender,
    date: req.body.date,
    trainer: req.body.trainer,
  });
  try {
    const savedEvent = await event.save();
    res.status(201).send({
      successs: true,
      event: savedEvent,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err });
  }
};

const updateEvents = async (req, res) => {
  try {
    const updatedEvent = await events.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({ success: true, data: updatedEvent });
  } catch (err) {
    res.status(404).json({ success: false, msg: err });
  }
};

const deleteEvents = async (req, res) => {
  try {
    const removeEvent = await events.remove({ _id: req.params.id });
    return res.status(200).json({ success: true, data: removeEvent });
  } catch (err) {
    res.status(404).json({ success: false, msg: err });
  }
};

module.exports = {
  getEvent,
  getEvents,
  searchEvents,
  createEvents,
  updateEvents,
  deleteEvents,
};
