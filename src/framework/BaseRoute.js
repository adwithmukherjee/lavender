const AuthType = require("./AuthType");
// eslint-disable-next-line no-unused-vars
const Response = require("./Response");
//--------------- end imports --------------
class BaseRoute {
    /**
   * overrides filepath-based routing
   * @returns {string}
   */
    get routeName() {
        return undefined;
    }

    /**
   * @returns {AuthType}
   */
    get authType() {
        return AuthType.NONE;
    }

    /**
   * custom, route specific middleware
   * @returns
   */
    get middleware() {
        return [];
    }

    /**
   * @link https://express-validator.github.io/docs/api/validation-chain
   * @returns {ValidationChain[]}
   */
    get validator() {
        return [];
    }

    /**
   * @param {import("express").Request} request
   * @return {Promise<Response>}
   */
    // eslint-disable-next-line no-unused-vars
    handler(request) {
        throw new Error("implement route handler");
    }
}

module.exports = BaseRoute;
