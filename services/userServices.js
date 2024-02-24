const mongoose = require("mongoose");
const User = require("../models/userSchema");
const { hashPassword } = require("../utils/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async () => {
   const result = await User.find();
   return result;
};

const createUser = async body => {
   const { email, password, contact_id } = body;

   if (!email || !password)
      throw new Error("Bad request, email and password must be supplied");

   try {
      const userExists = await User.findOne({ email: email });
      if (userExists) throw new Error("User already exists");

      const hashedPassword = await hashPassword(password);

      const user = await User.create({
         email: email,
         password: hashedPassword,
         contact_id: contact_id,
      });
      return user;
   } catch (error) {
      throw error;
   }
};

const updateUser = async body => {
   try {
      const user = await User.findOneAndUpdate({ email: body.email }, body, {
         new: true,
      });
      if (!user) throw new Error("User not found");

      return user;
   } catch (error) {
      throw error;
   }
};

const loginUser = async body => {
   const { email, password } = body;
   try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password)))
         throw new Error("Invalid email or password");

      const token = jwt.sign(
         {
            user: user.email,
            contact_id: user.contact_id,
         },
         process.env.JWT_PRIVATE_KEY
      );
      return token;
   } catch (error) {
      throw error;
   }
};

module.exports = {
   createUser,
   getUsers,
   loginUser,
   updateUser,
};
