const { Router } = require("express");
const FileUtils = require("../../utils/FileUtils");
const Response = require("../framework/Response");
const Promise = require("bluebird");
const Cors = require("cors");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const Middlewares = require("./Middlewares");
//----------- end imports ---------------
class RouterFactory {

    constructor({ corsOptions }) {
        this.corsOptions = corsOptions;
    }

    createRouters(apiDir = "./src/api") {
        const router = Router();
        FileUtils.recursiveWalkDir(apiDir, (filePath) => {
            const routes = require("../../" + filePath);
            const methods = Object.keys(routes);
            methods.forEach(method => {
                const routeInstance = new routes[method]();
                const routeName = routeInstance.routeName || this._filePathToRouteName(filePath);
                console.log(method, routeName);
                const middleware = this._configureMiddleware(routeInstance);
                const routeHandler = this._configureRouteHandler(routeInstance);

                router.options(routeName, Cors(this.corsOptions)); 
                router[method](routeName, middleware, routeHandler);
            });
      
        });
        return [router];
    }


    /**
     * @param {BaseRoute} route 
     * @returns {(request: Request, response: Response) => Promise<void>}
     */
    _configureRouteHandler(route) {
        const handler = route.handler;
        return (request, response) => {
            return Promise.resolve()
            .then(() => {
                const validatorResults = validationResult(request);
                if (!validatorResults.isEmpty()) {
                    // TODO: better error handling here
                    const error = new Error("Invalid parameters");
                    return Promise.reject(
                        Response.error(error).setStatus(StatusCodes.BAD_REQUEST)
                    );
                }
                return Promise.resolve();
            })
            .then(() => handler(request))
            .then((customResponse) => {
                return customResponse.send(request, response);
            })
            .catch((error) => {
                if (error instanceof Response) {
                    return error.send(request, response);
                }
                // TODO: better error handling
                const errorResponse = Response.error(error);
                return errorResponse.send(request, response);
            });
        };
    }
    
    /**
     * 
     * @param {BaseRoute} route 
     */
    _configureMiddleware(route) {
        // based on auth level and validators
        const middleware = [];
        middleware.push(Middlewares.handleAuthType(route.authType));
        middleware.push(Cors(this.corsOptions));
        middleware.push(...route.middleware);
        middleware.push(...route.validator);
        return middleware;
    }



    _filePathToRouteName(filePath) {
        let routeName = filePath;
        const suffix = filePath.slice(-3);
        if (suffix !== ".js") {
            throw new Error("Must be a javascript module");
        }
        if (filePath.indexOf("index.js") !== -1) {
            routeName = filePath.substring(0, filePath.indexOf("index.js") - 1);
        } else {
            routeName = filePath.substring(0, filePath.indexOf(".js"));
        }

        // handle params. eg [id] -> :id
        routeName = routeName.replace("[", ":").replace("]","");

        // remove prefix 
        routeName = routeName.replace("src/api", "");

        return routeName;
    }
}

module.exports = RouterFactory;