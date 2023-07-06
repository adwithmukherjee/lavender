const { Router } = require("express");
const FileUtils = require("../../utils/FileUtils");

class RouterFactory {

  constructor() { }

  createRouters() {
    const apiDir = "./src/api";
    const router = Router()
    FileUtils.recursiveWalkDir(apiDir, (filePath) => {
      const routes = require("../../" + filePath)
      const methods = Object.keys(routes)
      methods.forEach(method => {
        const routeInstance = new routes[method]()
        console.log(routeInstance)
        // check if method in Http Methods
        router[method](routeInstance.routeName, routeInstance.handler)
      })
      
    })
    return router
  }
}

module.exports = RouterFactory