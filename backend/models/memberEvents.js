const mongoose = require("mongoose");

const TrainerEventsSchema = new mongoose.Schema({
  memberId: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("trainerEvents", TrainerEventsSchema);
