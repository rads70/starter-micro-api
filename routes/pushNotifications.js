const express = require("express");
const router = express.Router();
const validateWith = require("../middleware/validation");
const userService = require("../services/userServices");
const Joi = require("joi");
const { Expo } = require("expo-server-sdk");
const User = require("../models/userSchema");

const expo = new Expo();

const schema = Joi.object({
   contactIds: Joi.array().items(Joi.number()).required().label("Contact Ids"),
   title: Joi.string().required().label("Title"),
   message: Joi.string().required().label("Message"),
});

router.post("/", validateWith(schema), async (req, res, next) => {
   const messages = [];
   const pushTokens = [];

   const users = await User.find(
      {
         contact_id: {
            $in: req.body.contactIds,
         },
      },
      "-password"
   );

   if (users) {
      users.forEach(user => {
         pushTokens.push(user.pushToken);
      });
   } else
      res.status(400).json({ error: true, message: "Failed to get tokens" });

   for (let pushToken of pushTokens) {
      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
         console.error(
            `Push token ${pushToken} is not a valid Expo push token`
         );
         continue;
      }

      // Construct a message
      messages.push({
         to: pushToken,
         sound: "default",
         body: req.body.message,
         title: req.body.title,
         data: { withSome: "data" },
      });
   }
   let chunks = expo.chunkPushNotifications(messages);
   let tickets = [];
   (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
         try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
            // NOTE: If a ticket contains an error code in ticket.details.error, you
            // must handle it appropriately. The error codes are listed in the Expo
            // documentation:
            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
         } catch (error) {
            console.error(error);
         }
      }
   })();
   res.status(200).send({ error: false, message: "Success" });
});

module.exports = router;
