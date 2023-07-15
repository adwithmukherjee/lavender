import { AuthType, Controller, Request, Response, Route } from "@lavender/sls-framework";
//--------------- end imports ---------------

export default class UserController extends Controller {
  get resources() {
    return ["user"];
  }

  get middleware() {
    return [];
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

export const handler = Controller.handler(new UserController());

