const express = require("express");
const router = express.Router();

const {
  getEvent,
  getEvents,
  searchEvents,
  createEvents,
  updateEvents,
  deleteEvents,
} = require("../controllers/events");

router.route("/").get(getEvents).post(createEvents);
router.route("/:id").get(getEvent).patch(updateEvents).delete(deleteEvents);
module.exports = router;
