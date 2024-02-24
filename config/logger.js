const winston = require("winston");

const logger = winston.createLogger({
   level: "info",
   format: winston.format.json(),
   transports: [new winston.transports.Console()],
});
//esntry dsn: "https://52c1ad3a37048a47bdeeadb484bcffba@o1202686.ingest.sentry.io/4506797841514496",
module.exports = logger;
