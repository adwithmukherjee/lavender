const { StatusCodes } = require("http-status-codes");
const _ = require("lodash");
const ContentType = require("./ContentType");
//------------------- end imports ---------------------

class Response {
    constructor() {}

    /**
     * 
     * @returns {Response}
     */
    static ok() {
        return new Response()
        .setContentType(ContentType.JSON)
        .setStatus(StatusCodes.OK)
        .setMessage("ok");
    }

    /**
     * 
     * @param {Error} e 
     * @returns 
     */
    static error(e) {
        // TODO: better Error handling
        return new Response()
        .setContentType(ContentType.JSON)
        .setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        .setMessage(`ERROR: ${e.message}`);
    }

    /**
   * @param {StatusCodes} status
   */
    setStatus(status) {
        this.status = status;
        return this;
    }

    setContentType(contentType) {
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

    send(request, response) {
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.set("Content-Type", this.contentType);
        // TODO: LOG RESPONSE
        response.status(this.status).send(this.payload);
    }
}

module.exports = Response;
