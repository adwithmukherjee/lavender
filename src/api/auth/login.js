const BaseRoute = require("../../framework/BaseRoute");
const Response = require("../../framework/Response");
//----------- end imports ---------------
class LoginRoute extends BaseRoute {

    handler(request) {
        console.log(request.body);
        return Response.ok();
    }
}

module.exports = {
    post: LoginRoute,
};
