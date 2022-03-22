const mongoose = require("mongoose");

const TrainerEventsSchema = new mongoose.Schema({
  trainer: {
    type: String,
    required: true,
  },
  event: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("trainerEvents", TrainerEventsSchema);
