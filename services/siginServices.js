const mongoose = require("mongoose");
const Signin = require("../models/signinSchema");

const getSignins = async () => {
   try {
      const res = await Signin.find();
      return res;
   } catch (error) {
      return error;
   }
};

const getActivitySignins = async activity_id => {
   try {
      const res = await Signin.find({ activity_id: activity_id });

      return res;
   } catch (error) {
      return error;
   }
};

const createSignin = async body => {
   try {
      const res = await Signin.create(body);
      return res;
   } catch (error) {
      return error;
   }
};

const updateSignin = async body => {
   const signin = await Signin.find({
      activity_id: body.activity_id,
      contact_id: body.contact_id,
   });

   if (!signin.length) {
      try {
         const res = await Signin.create(body);
         return res;
      } catch (error) {
         return error;
      }
   }

   try {
      const res = await Signin.findOneAndUpdate(
         { contact_id: body.contact_id, activity_id: body.activity_id },
         { message: body.message, signedIn: body.signedIn },
         { new: true }
      );
      return res;
   } catch (error) {
      return error;
   }
};

module.exports = {
   getSignins,
   getActivitySignins,
   createSignin,
   updateSignin,
};
