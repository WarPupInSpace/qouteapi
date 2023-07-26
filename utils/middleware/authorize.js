// midleware to check if user has been authorized.
const authorizedUser = (req, res, next) => {
    if(req.session.authorized) {
      res.next();
    } else {
      const err = Error("You're not authorized to view this page");
      err.status = 403;
    }
  }

  module.exports = {
    authorizedUser,
  }