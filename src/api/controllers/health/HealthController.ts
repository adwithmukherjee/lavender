import {
  AuthType,
  Controller,
  Route,
  Request,
  Response,
} from "@lavender/sls-framework";
import container from "../../../container";

export default class HealthController extends Controller {
  
  get resources() {
    return ["health"];
  }

  get middleware() {
    return [];
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
    return Response.ok().setPayload({ status: "healthy", body }).promise();
  }

  health(request: Request): Promise<Response> {
    // const res = container.cradle.testEvent.execute();
    const res = { status: "executed" };
    return Response.ok().setPayload({ status: "healthy ", res }).promise();
    
  }
}


