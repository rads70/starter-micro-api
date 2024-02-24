const mongoose = require("mongoose");
const logger = require("../config/logger");

const connectDB = async () => {
   try {
      mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      logger.info(`Mongo DB Connected`);
   } catch (error) {
      logger.error(`Error: ${error.message}`);
      process.exit(1);
   }
};

module.exports = connectDB;
