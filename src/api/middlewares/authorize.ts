import AuthType from "@/utils/AuthType";
import GenericErrors from "@/utils/GenericErrors";
import { Middleware, Response, StatusCodes } from "@sls-framework";
import { asValue } from "awilix/lib/resolvers";

const handlePassThrough : Middleware = (req, res, next) => {
  next();
};

const handleUserAuth : Middleware = (req, res, next) => {
  if (req.headers["authorization"] === "user") {
    req.scope.register({
      currentUser: asValue({ user: "user" }),
    });
    next();
  } else {
    return Response.error(GenericErrors.INVALID_ACCESS_LEVEL)
      .setStatus(StatusCodes.UNAUTHORIZED)
      .send(req, res);
  }
};

const handleAdminAuth : Middleware = (req, res, next) => {
  if(req.headers["authorization"] === "admin") {
    req.scope.register({
      currentUser: asValue({ user: "admin" }),
    });
    next();
  } else {
    return Response
      .error(GenericErrors.INVALID_ACCESS_LEVEL)
      .setStatus(StatusCodes.UNAUTHORIZED)
      .send(req, res);
  }
};

const authorize = (authType: AuthType) => {

  switch(authType) {
    case AuthType.NONE:
      return handlePassThrough;
    case AuthType.USER:
      return handleUserAuth; 
    case AuthType.ADMIN: 
      return handleAdminAuth;
    default:
      return handlePassThrough;
  }
};

export default authorize;