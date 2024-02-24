const mongoose = require("mongoose");

const signinSchema = new mongoose.Schema({
   contact_id: { type: Number, required: true },
   activity_id: { type: Number, required: true },
   signedIn: { type: Boolean, default: false },
   message: { type: String, default: "" },
});

const Signin = mongoose.model("Signin", signinSchema);

module.exports = Signin;
