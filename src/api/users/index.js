const BaseRoute = require("../../framework/BaseRoute");

class GetUsersRoute extends BaseRoute {

  handler(request, response) {
    return response
      .status(200)
      .json({ message: "implement get users route", status: "health" });
  }
}

module.exports = {
  get: GetUsersRoute,
};
