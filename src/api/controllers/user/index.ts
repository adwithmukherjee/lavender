import { Request } from "lambda-api";
import Controller from "../../../../framework/lambda/Controller";
import Route from "../../../../framework/lambda/Route";
import Response from "../../../../framework/lambda/Response";
import AuthType from "../../../../framework/utils/AuthType";
import Lambda from "../../../../framework/constructs/ApiLambda";

export default class UserController extends Controller {
  get resources() {
    return ["user"];
  }

  get routes() {
    return [
      Route.get({
        path: "/user",
        handler: this.health,
        authLevel: AuthType.NONE,
      }),
    ];
  }

  health(request: Request): Promise<Response> {
    return Promise.resolve().then(() =>
      Response.ok().setPayload({ status: "healthy in user" })
    );
  }
}

export const handler = Lambda.apiHandler(new UserController());

