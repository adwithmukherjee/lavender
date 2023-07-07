const BaseRoute = require("../../../framework/BaseRoute");
const Response = require("../../../framework/Response");
//----------- end imports ---------------
class GetUserByIdRoute extends BaseRoute {

    handler(request) {
        console.log(request.params);
        return Response.ok();
    }
}

module.exports = {
    get: GetUserByIdRoute,
};
