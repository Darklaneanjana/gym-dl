const express = require("express");
const router = express.Router();

const {
  loginTrainers,
  getTrainer,
  getTrainers,
  createTrainers,
  updateTrainers,
  deleteTrainers,
} = require("../controllers/trainers");

router.route("/").get(getTrainers).post(createTrainers);
router
  .route("/:id")
  .get(getTrainer)
  .patch(updateTrainers)
  .delete(deleteTrainers);
router.route("/login").post(loginTrainers);

module.exports = router;
