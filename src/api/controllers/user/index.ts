import authorize from "@/api/middlewares/authorize";
import api, {
  AuthType,
  Request,
  Response,
  Route,
} from "@sls-framework";
import _ from "lodash";
import BaseController from "../BaseController";
//--------------- end imports ---------------

class UserController extends BaseController {
  get resources() {
    return ["user"];
  }

  get customMiddleware() {
    return [authorize(AuthType.USER)];
  }

  get routes() {
    return [
      Route.get("/user/:userId", this.getUser),
      Route.post("/user", this.createUser),
      Route.get("/user/me", this.getUser),
    ];
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
    const userId = _.toNumber(request.params.userId);
    const user = request.scope.cradle.getUser.execute(userId);
    return Response.ok()
      .setPayload({
        status: "healthy in user",
        user,
        currentUser: request.scope.cradle.currentUser,
      })
      .promise();
  }
}

export default new UserController();

export const handler = api(new UserController());

