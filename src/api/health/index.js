const BaseRoute = require("../../framework/BaseRoute")

class GetHealthRoute extends BaseRoute {

  handler(request, response) {
    return response.status(200).json({ status: "healthy" })
  }
}


module.exports = {
  get: GetHealthRoute,
}