function logError(err) {
   console.error(err);
}

function logErrorMiddleware(err, res, req, next) {
   logError(err);
   next(err);
}

function returnError(err, req, res, next) {
   res.status(err.statusCode || 500).send({
      success: false,
      error: err.message,
   });
}

function isOperationalError(error) {
   if (error instanceof BaseError) {
      return error.isOperational;
   }
   return false;
}

module.exports = {
   logError,
   logErrorMiddleware,
   returnError,
   isOperationalError,
};
