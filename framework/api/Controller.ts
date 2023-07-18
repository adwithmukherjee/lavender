import LambdaApi, { API, HandlerFunction, Request, Response } from "lambda-api";
import Middleware from "./Middleware";
import Route from "./Route";
import _ from "lodash";

/**
 * Controllers map 1 to 1 with Lambdas
 */
abstract class Controller {
  api: API;

  constructor() {
    // INIT API SERVICES HERE
    this.api = LambdaApi();
    this.registerRoutes();
  }

  abstract get resources(): string[];

  abstract get routes(): Route[];

  abstract get middleware(): Middleware[];

  registerRoutes() {
    this.routes.forEach((route) => {
      const routeHandler: HandlerFunction = (req: Request, res: Response) => {
        return Promise.resolve()
        .then(() => route.handler(req))
        .then((response) => response.send(req, res));
      };
      _.assign([]);
      const middleware = _.merge([], route.middleware, this.middleware);
      this.api[route.method](route.path, ...middleware, routeHandler);
    });
  }

  static handler(controller: Controller) {
    return async (event, context) => {
      return await controller.api.run(event, context);
    };
  }
}

export default Controller;