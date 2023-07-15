

export default class Middleware {
  
  request: Request;
  response: Response;
  next: () => void;

  constructor(request, response, next) {
    request;
    response;
    next;
  }

}