import { ApiLambda, AuthType, Controller, Route, Request, Response } from "@lavender/sls-framework";

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
      Route.post({
        path: "/health", 
        handler: this.postHealth, 
        authLevel: AuthType.NONE,
      }),
    ];
  }

  postHealth(request: Request) {
    const body = request.body;
    return Response.ok()
    .setPayload({ status: "healthy", body })
    .promise();
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

export const handler = ApiLambda.handler(new HealthController());
