import { Request } from "lambda-api";
import _ from "lodash";
import AuthType from "../utils/AuthType";
import Response from "./Response";
//------------------- end imports ---------------------

type RouteProperties = {
  path: string;
  method: string;
  handler: (request: Request) => Promise<Response>;
  authLevel: AuthType;
  validator?: (...args) => boolean;
  version?: string;
};

export default class Route {
  path: string;
  method: string;
  validator: (...args) => boolean;
  handler: (request: Request) => Promise<Response>;
  authLevel: string;
  version: string;

  constructor(params: RouteProperties) {
    _.assign(this, params);
  }

  static get(params: Omit<RouteProperties, "method">) {
    return Route.build({
      method: "get",
      ...params,
    });
  }

  static post(params: Omit<RouteProperties, "method">) {
    return Route.build({
      method: "post",
      ...params,
    });
  }

  static put(params: Omit<RouteProperties, "method">) {
    return Route.build({
      method: "put",
      ...params,
    });
  }

  static delete(params: Omit<RouteProperties, "method">) {
    return Route.build({
      method: "delete",
      ...params,
    });
  }

  static build(params: RouteProperties) {
    return new Route(params);
  }
}