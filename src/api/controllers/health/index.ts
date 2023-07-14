import { Request } from "lambda-api";
import Lambda from "../../../../framework/constructs/ApiLambda";
import Controller from "../../../../framework/lambda/Controller";
import Response from "../../../../framework/lambda/Response";
import Route from "../../../../framework/lambda/Route";
import AuthType from "../../../../framework/utils/AuthType";

export default class HealthController extends Controller {
  get resources() {
    return ["health"];
  }

  get routes() {
    return [
      Route.get({
        path: "/health",
        handler: this.health,
        authLevel: AuthType.NONE,
      }),
    ];
  }

  health(request: Request) : Promise<Response> {
    return Promise.resolve()
    .then(() => 
      Response
      .ok()
      .setPayload({ status: "healthy "})
    );
  }
}

export const handler = Lambda.apiHandler(new HealthController());
