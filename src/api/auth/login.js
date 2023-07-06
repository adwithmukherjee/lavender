const BaseRoute = require("../../framework/BaseRoute");

class LoginRoute extends BaseRoute {
  get routeName() {
    return "/auth/login";
  }

  handler(request, response) {
    return response
      .status(200)
      .json({ message: "implement login route", status: "health" });
  }
}

module.exports = {
  post: LoginRoute
};
