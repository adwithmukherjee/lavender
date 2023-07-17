import { API } from "lambda-api";


type MiddlewareHandler = () => {
  handler: (request: Request, response: Response, next: () => void) => void
}

// assumption, container request and response are registered ahead of time
export default class Middleware {
  
  handler: MiddlewareHandler;
  
  constructor({ request, response }) {
    this.handler = handler;
  }

  register(api: API) {
    api.use(this.handler);
  }

  static build(api: API, handler: MiddlewareHandler) {
    return new Middleware(handler).register(api);
  }

}