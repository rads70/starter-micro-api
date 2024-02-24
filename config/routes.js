const auth = require("../middleware/auth");
const authRoutes = require("../routes/auth");
const activityRoutes = require("../routes/activities");
const signinRoutes = require("../routes/signins");
const pushNotificationRoutes = require("../routes/pushNotifications");
const userRoutes = require("../routes/users");

module.exports = function (app) {
   app.use("/api/auth", authRoutes);
   app.use("/api/activities", activityRoutes);
   app.use("/api/signins", signinRoutes);
   app.use("/api/pushNotifications", pushNotificationRoutes);
   app.use("/api/users", userRoutes);
};
