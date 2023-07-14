import LambdaApi, { API } from "lambda-api";
import Route from "./Route";

/**
 * Controllers map 1 to 1 with Lambdas
 */
abstract class Controller {

  api: API;

  constructor() {
    this.api = LambdaApi();
  }

  abstract get resources() : string[]

  abstract get routes() : Route[]

}

export default Controller;