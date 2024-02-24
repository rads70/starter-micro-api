const express = require("express");
const router = express.Router();
const validateWith = require("../middleware/validation");
const userService = require("../services/userServices");
const Joi = require("joi");

const putSchema = Joi.object({
   email: Joi.string().email().required(),
   contact_id: Joi.number().required(),
   pushToken: Joi.string().required(),
});

router.put("/", validateWith(putSchema), async (req, res, next) => {
   try {
      const user = await userService.updateUser(req.body);
      res.status(200).json(user);
   } catch (error) {
      res.status(400).json({ error: true, message: "Bad request" });
   }
});

module.exports = router;
