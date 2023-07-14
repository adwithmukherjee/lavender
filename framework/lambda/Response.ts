import { StatusCodes } from "http-status-codes";
import { Request as LambdaRequest, Response as LambdaResponse } from "lambda-api";
import _ from "lodash";
import ContentType from "../utils/ContentType";
//------------------- end imports ---------------------

class Response {

  status: StatusCodes;
  contentType: ContentType;
  payload;

  static ok() {
    return new Response()
    .setContentType(ContentType.JSON)
    .setStatus(StatusCodes.OK)
    .setMessage("ok");
  }

  static error(e) {
    // TODO: better Error handling
    return new Response()
    .setContentType(ContentType.JSON)
    .setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    .setMessage(`ERROR: ${e.message}`);
  }

  setStatus(status: StatusCodes) {
    this.status = status;
    return this;
  }

  setContentType(contentType: ContentType) {
    this.contentType = contentType;
    return this;
  }

  setPayload(payload) {
    this.payload = _.assign(this.payload, { data: payload });
    return this;
  }

  setMessage(message) {
    this.payload = _.assign(this.payload, { message });
    return this;
  }

  promise() {
    return Promise.resolve(this);
  }

  send(request: LambdaRequest, response: LambdaResponse) {
    response.cache(false);
    response.type(this.contentType);
    response.status(this.status).send(this.payload);
  }
}

export default Response;
