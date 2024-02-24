const express = require("express");
const router = express.Router();
const validateWith = require("../middleware/validation");
const activityService = require("../services/activityServices");
const Joi = require("joi");

router.post("/", async (req, res, next) => {
  try {
    const result = await activityService.getUserActivities(req.body);
    if (!result.error) res.status(200).json(result);
    else throw new Error(result.message);
  } catch (error) {
    console.log("Activities get", error);
  }
});

router.post("/id", async (req, res, next) => {
  try {
    const result = await activityService.getActivityById(req.body.id);
    if (!result.error) res.status(200).json(result);
    else throw new Error(result.message);
  } catch (error) {
    console.log("Activity by id get", error);
  }
});
module.exports = router;
