import authorize from "@/api/middlewares/authorize";
import {
  AuthType,
  Controller,
  Middleware,
  Request,
  Response,
  Route,
} from "@sls-framework";

export default class HealthController extends Controller {
  
  get resources() {
    return ["health"];
  }

  get middleware() {
    return [this.warmup, authorize(AuthType.USER)];
  }

  get routes() {
    return [
      Route.get("/health", this.health),
      Route.post("/health", this.postHealth),
    ];
  }

  // TODO: separate BUSINESS LOGIC CODE from INFRA CODE. this controller is too much of both. is that what makes it special?
  // all Business Logic code should use container for DI. therefore does import container here make sense? 
  // feels right that events should only be called here. 

  // solution? : register api and Controller with container and export container from here. Then, ApiLambda reaches into the container to start the lambda. 

  // should middleware actions be a child of controller? probably


  get warmup() : Middleware {
    return (req, res, next) => {
      next();
    };
  }

  postHealth(request: Request) {
    const body = request.body;
    return Response.ok().setPayload({ requestingUser: request.user, status: "healthy" }).promise();
  }

  health(request: Request): Promise<Response> {
    return Response.ok().setPayload({ status: "healthy" }).promise();
  }
}


