const { body } = require("express-validator");
const BaseRoute = require("../../framework/BaseRoute");
const Response = require("../../framework/Response");
const AuthType = require("../../framework/AuthType");
//----------- end imports ---------------
class GetHealthRoute extends BaseRoute {

    get authType() {
        return AuthType.USER;
    }

    get validator() {
        return [
            body("ass").exists(),
        ];
    }

    handler(request) {
        console.log(request.body);

        return Response.ok()
        .setPayload({
            status: "healthy",
        })
        .promise();
    }
}

module.exports = {
    post: GetHealthRoute,
};
