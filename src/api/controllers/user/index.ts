import authorize from "@/api/middlewares/authorize";
import container from "@/container";
import api, {
  AuthType,
  Controller,
  Middleware,
  Request,
  Response,
  Route,
} from "@sls-framework";
import { asValue } from "awilix";
//--------------- end imports ---------------

class UserController extends Controller {
  get resources() {
    return ["user"];
  }

  get middleware() {
    return [authorize(AuthType.USER), this.warmup];
  }

  get routes() {
    return [
      Route.get("/user", this.getUser),
      Route.post("/user", this.createUser),
      Route.put("/user", this.getUserV2),
    ];
  }

  get warmup(): Middleware {
    return (req, res, next) => {
      const scope = container.createScope();
      req.scope = scope;
      req.scope.register({
        currentUser: asValue(req.user),
      });
      next();
    };
  }

  createUser(request: Request) {
    const body = request.body;
    const newUser = request.scope
      .resolve("userRepository")
      .createUser(body.username);
    return Response.ok()
      .setPayload({ requestingUser: request.user, newUser })
      .promise();
  }

  getUser(request: Request): Promise<Response> {
    return Response.ok()
      .setPayload({ status: "healthy in user", requestingUser: request.user })
      .promise();
  }

  getUserV2(request: Request): Promise<Response> {
    return Response.ok()
      .setPayload({ status: "healthy in user 2", currentUser: request.scope.cradle.currentUser})
      .promise();
  }
}

export default new UserController();

export const handler = api(new UserController());

