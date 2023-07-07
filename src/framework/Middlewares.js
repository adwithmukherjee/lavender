const { StatusCodes } = require("http-status-codes");
const AuthType = require("./AuthType");
const Response = require("./Response");
//--------------- end imports ---------------

class Middlewares {

    /**
     * 
     * @param {AuthType} authType 
     * @returns {(req, res, next) => void}
     */
    static handleAuthType(authType) {
        switch (authType) {
            case AuthType.NONE:
                return this.passThrough;
            case AuthType.USER:
                return this.userAuth;
        }
    }

    static passThrough(req, res, next) {
        next();
    }

    static userAuth(req, res) {
        // TODO: some generic error responses?
        const error = new Error("Unauthorized");
        return Response.error(error).setStatus(StatusCodes.UNAUTHORIZED).send(req,res);
    }
}

module.exports = Middlewares;