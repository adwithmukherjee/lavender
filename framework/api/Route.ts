import _ from "lodash";
import AuthType from "../utils/AuthType";
import Request from "./Request";
import Response from "./Response";
import Middleware from "./Middleware";
//------------------- end imports ---------------------

type RouteProperties = {
  path: string;
  method: string;
  handler: (request: Request) => Promise<Response>;
  middleware?: Middleware[]
  // validator?: (...args) => boolean;
  // version?: string;
};

export default class Route {
  path: string;
  method: string;
  handler: (request: Request) => Promise<Response>;
  validator?: (...args) => boolean;
  middleware?: Middleware[] = [];
  version?: string;

  constructor(params: RouteProperties) {
    _.assign(this, params);
  }

  static get(path: string, handler: (request: Request) => Promise<Response>) {
    return Route.build({
      method: "get",
      path,
      handler,
    });
  }

  static post(path: string, handler: (request: Request) => Promise<Response>) {
    return Route.build({
      method: "post",
      path,
      handler,
    });
  }

  static put(path: string, handler: (request: Request) => Promise<Response>) {
    return Route.build({
      method: "put",
      path,
      handler,
    });
  }

  static delete(path: string, handler: (request: Request) => Promise<Response>) {
    return Route.build({
      method: "delete",
      path,
      handler,
    });
  }

  static build(params: RouteProperties) {
    return new Route(params);
  }

  use(middleware: Middleware) {
    this.middleware.push(middleware);
    return this;
  }
}