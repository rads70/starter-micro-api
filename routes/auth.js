const express = require("express");
const router = express.Router();
const validateWith = require("../middleware/validation");
const userService = require("../services/userServices");
const Joi = require("joi");

const schema = Joi.object({
   email: Joi.string().email().required(),
   password: Joi.string().required().min(8),
   contact_id: Joi.number(),
});

router.get("/", async (req, res, next) => {
   try {
      const result = await userService.getUsers();
      res.status(200).json(result);
   } catch (error) {
      res.status(error.code).json(error.message);
   }
});

router.post("/", validateWith(schema), async (req, res, next) => {
   try {
      const result = await userService.createUser(req.body);

      res.status(201).json(result);
   } catch (error) {
      res.status(400).json(error.message);
   }
});

router.post("/login", validateWith(schema), async (req, res, next) => {
   try {
      const result = await userService.loginUser(req.body);
      res.status(200).json(result);
   } catch (error) {
      res.status(400).json(error.message);
   }
});
module.exports = router;
