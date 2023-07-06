const _ = require("lodash");
const Fs = require("fs");
const Path = require("path");
const FileUtils = require("./utils/FileUtils");
const Express = require("express");
const Http = require("http");
const { Router } = Express
// -------------- end imports ----------------

const dotenv = require("dotenv");
const BaseRoute = require("./src/framework/BaseRoute");
const RouterFactory = require("./src/framework/RouterFactory");
dotenv.config();

const apiDir = "./src/api"

FileUtils.recursiveWalkDir(apiDir, (filePath) => {
  console.log('File:', filePath)
})

const port = 8000

const app = Express()
const server = Http.createServer(app)

/// TEST CLASS LOADING 

const router = new RouterFactory().createRouters()

app.use(router)
// const fileName = "./src/api/health/index.js";
// const instance = require(fileName)

// console.log(Object.keys(instance))

// if(!_.isNil(instance.get)) {
//   const route = new instance.get()
//   console.log(route.routeName)

//   router["get"](route.routeName, route.handler)
// }

//////

// router["get"]("/test", (req, res) => {
//   console.log('received: ', req.body)
//   return res.status(200).json({ status: "healthy" })
// })

// app.use(router)

server.listen(port, () => {
  console.log(`Server started on ${port}, env: ${process.env.NODE_ENV}`);
});

