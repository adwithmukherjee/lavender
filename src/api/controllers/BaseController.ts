import container from "@/container";
import { Controller, Middleware } from "@sls-framework";
import _ from "lodash";

export default abstract class BaseController extends Controller {
  
  get injectContainer(): Middleware {
    return (req, res, next) => {
      req.scope = container.createScope();
      console.log("CRADLE",req.scope.cradle);
      console.log("CRADLE", Object.keys(req.scope.cradle));
      next();
    };
  }

  get middleware() {
    return _.concat([], this.injectContainer, this.customMiddleware);
  }

  abstract get customMiddleware() : Middleware[]
}