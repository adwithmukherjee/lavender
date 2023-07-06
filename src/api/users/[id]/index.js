const BaseRoute = require("../../../framework/BaseRoute");


class GetUserByIdRoute extends BaseRoute {
  get routeName() {
    return "/users/:id";
  }

  handler(request, response) {
    console.log(request.params)
    return response
      .status(200)
      .json({ message: "implement get user route", status: "health" });
  }
}

module.exports = {
  get: GetUserByIdRoute
};
