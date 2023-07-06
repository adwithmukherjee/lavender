const _ = require("lodash");
const Express = require("express");
const Http = require("http");
const RouterFactory = require("./RouterFactory");
//----------- end imports ---------------

// TODO: add CORS config
// TODO: add Auth interceptors
// TODO: add Lambda support
// TODO: Middlewares for body parsing, etc.

class ApiServer {
  constructor() {
    this.app = Express();
    this.apiDir = "./src/api";
  }

  init() {
    // TODO: add all proper middlewares here (this.app.use)
    const routerFactory = new RouterFactory();
    const routers = routerFactory.createRouters();

    // init routes
    routers.forEach((router) => {
      this.app.use(router);
    });

    // 404 Fallback
    this.app.get("*", (req, res) => {
      // console.error(GenericErrors.RESOURCE_NOT_FOUND);
      res.status(404).json({ message: "Resource not found" });
    });
  }

  start() {
    this.init();
    this.server = Http.createServer(this.app);
    this.server.listen(process.env.PORT, () => {
      console.log(
        `Server started on ${process.env.PORT}, env: ${process.env.NODE_ENV}`
      );
    });
  }

  stop() {
    if (!_.isNil(this.server)) {
      this.server.close();
    }
  }
}

module.exports = ApiServer;
