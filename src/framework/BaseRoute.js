

class BaseRoute {

  get routeName() {
    return undefined
  }

  /**
   * 
   * @param {import("express").Request} request 
   * @param {import("express").Response} response 
   */
  handler(request, response) {
    throw new Error("implement route handler")
  }

}

module.exports = BaseRoute