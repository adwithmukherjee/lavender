// const { get: GetHealthRoute } = require("./src/api/health/index.js");
// const Express = require("express");
// const serverlessExpress = require("@vendia/serverless-express");

// // LAMBDA TESTING

// // const healthRoute = new GetHealthRoute();
// const app = Express(); 

// app.get("/", (req, res) => {
//     console.log(req.body);
//     return res.status(200).json({ body: "test" });
// });

// app.get("/health", (req, res) => {
//     console.log(req.body);
//     return res.status(200).json({ status: "healthy" });
// });

const handler = () => {
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/json" },
        body: JSON.stringify({ message: "Hello from my Lambda node!" }),
    };
};

module.exports = {
    handler,
};
