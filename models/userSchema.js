const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   contact_id: { type: Number, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true },
   pushToken: { type: String, default: "" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
