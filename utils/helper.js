const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { isValidObjectId } = require("mongoose");

exports.sendError = (res, error, status = 401) => {
   res.status(status).json({ success: false, error });
};

exports.createRandomBytes = () =>
   new Promise((resolve, reject) => {
      crypto.randomBytes(30, (err, buff) => {
         if (err) reject(err);

         const token = buff.toString("hex");
         resolve(token);
      });
   });

exports.hashPassword = async password => {
   const salt = await bcrypt.genSalt(11);
   const hashedPassword = await bcrypt.hash(password, salt);
   return hashedPassword;
};

exports.validObjectId = id => {
   if (!isValidObjectId(id)) return false;
   return true;
};
