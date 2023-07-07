const _ = require("lodash");
const Express = require("express");
const Http = require("http");
const BodyParser = require("body-parser");
const CookieParser = require("cookie-parser");
const Compression = require("compression");
const RouterFactory = require("./RouterFactory");

//----------- end imports ---------------

// TODO: add CORS config
// TODO: add Auth interceptors
// TODO: add Lambda support
// TODO: Middlewares for body parsing, etc.

class ApiServer {
    constructor() {
        this.app = Express();
        this.apiDir = "./src/api";
        this.corsDomains = [];
    }

    init() {
        this.app.enable("trust proxy"); // Enables rate limiter behind reverse proxy
        this.app.disable("x-powered-by");
        this.app.use(BodyParser.json());
        this.app.use(BodyParser.urlencoded({ extended: false }));
        this.app.use(CookieParser());
        this.app.use(Compression());
        // TODO: add all proper middlewares here (this.app.use)
        const routerFactory = new RouterFactory({
            corsOptions: this._buildCorsOptions(),
        });
        const routers = routerFactory.createRouters();

        // init routes
        routers.forEach((router) => {
            this.app.use(router);
        });

        // 404 Fallback
        this.app.get("*", (req, res) => {
            // console.error(GenericErrors.RESOURCE_NOT_FOUND);
            res.status(404).json({ message: "Resource not found" });
        });
    }

    start() {
        this.init();
        this.server = Http.createServer(this.app);
        this.server.listen(process.env.PORT, () => {
            console.log(
                `Server started on ${process.env.PORT}, env: ${process.env.NODE_ENV}`
            );
        });
    }

    stop() {
        if (!_.isNil(this.server)) {
            this.server.close();
        }
    }

    _buildCorsOptions() {
        const corsWhitelist = this.corsDomains;

        if (process.env.NODE_ENV === "localdev") {
            corsWhitelist.push("null", "http://localhost", "http://localhost:3000");
        }

        return {
            origin: function (origin, callback) {
                if (corsWhitelist.indexOf(origin) !== -1 || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error("CORS not allowed"));
                }
            },
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            preflightContinue: false,
            optionsSuccessStatus: 204,
        };
    }
}

module.exports = ApiServer;
