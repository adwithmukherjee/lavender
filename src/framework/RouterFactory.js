const { Router } = require("express");
const FileUtils = require("../../utils/FileUtils");
//----------- end imports ---------------
class RouterFactory {

  constructor() { }

  createRouters(apiDir = "./src/api") {
    // const apiDir = "./src/api";
    const router = Router()
    FileUtils.recursiveWalkDir(apiDir, (filePath) => {
      const routes = require("../../" + filePath)
      const methods = Object.keys(routes)
      methods.forEach(method => {
        const routeInstance = new routes[method]()
        const routeName =
          routeInstance.routeName || this._filePathToRouteName(filePath);

        console.log(method, routeName)
        router[method](routeName, routeInstance.handler)
      })
      
    })
    return [router]
  }

  _filePathToRouteName(filePath) {
    let routeName = filePath
    const suffix = filePath.slice(-3);
    if (suffix !== ".js") {
      throw new Error("Must be a javascript module")
    }
    if (filePath.indexOf("index.js") !== -1) {
      routeName = filePath.substring(0, filePath.indexOf("index.js") - 1);
    } else {
      routeName = filePath.substring(0, filePath.indexOf(".js"))
    }

    // handle params. eg [id] -> :id
    routeName = routeName.replace("[", ":").replace("]","")

    // remove prefix 
    routeName = routeName.replace("src/api", "")

    return routeName
  }
}

module.exports = RouterFactory