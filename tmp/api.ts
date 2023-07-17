import LambdaApi, { Request, Response } from "lambda-api";
import container from "../src/container";
import { asValue } from "awilix";
const api = LambdaApi();

// Principles: 
// Singletons, services, actions inited in container
// Register request as value in container
// Register response as a scoped value in container

export const handler = async (event, context) => {

  // register API Routes, can be done out of function scope with `api`
  
  // init scoped services, this must be done WITHIN function scope
  
  // register container in middleware: 
  api.use((request, response) => {
    request.scope = container.createScope();
    request.scope.register({
      user: { sample: "user"},
    });
  });


  api.get("/test", (req: Request, res: Response) => {
    container.register({
      request: asValue(req),
    });

  });
  return await api.run(event, context);
};

