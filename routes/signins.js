const express = require("express");
const router = express.Router();
const validateWith = require("../middleware/validation");
const signinService = require("../services/siginServices");
const Joi = require("joi");

const schema = Joi.object({
  activity_id: Joi.number().required().label("Activity Id"),
  message: Joi.string().optional(),
  contact_id: Joi.number().required().label("Contact Id"),
  signedIn: Joi.boolean().optional(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await signinService.getSignins();
    res.status(200).json(result);
  } catch (error) {
    console.log("Signin get", error);
  }
});

router.get("/activity", async (req, res, next) => {
  try {
    const result = await signinService.getActivitySignins(
      req.query.params.activity_id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res, next) => {
  const body = validateWith(schema);
  if (body) {
    try {
      const result = await signinService.createSignin(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json(error.message);
      console.log("Create signin", error);
    }
  } else res.status(400).json({ error: true, message: "Bad request" });
});

router.put("/", async (req, res, next) => {
  const body = validateWith(schema);

  if (body) {
    try {
      const result = await signinService.updateSignin(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json(error.message);
      console.log("Update signin", error);
    }
  } else res.status(400).json({ error: true, message: "Bad request" });
});

module.exports = router;
