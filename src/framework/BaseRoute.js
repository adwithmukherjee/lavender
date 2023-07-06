

class BaseRoute {

  get routeName() {
    throw new Error("give route a name")
  }

  handler(request, response) {
    throw new Error("implement route handler")
  }

}

module.exports = BaseRoute