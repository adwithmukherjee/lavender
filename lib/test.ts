import FileUtils from "../framework/utils/FileUtils";
import Controller from "../framework/lambda/Controller";
import fs from "fs";
const path = require("path");
import ApiLambdaFactory from "../framework/constructs/ApiLambda";

// const dir = "./src/api/controllers";

// FileUtils.walkDir(dir, (filePath) => {
//   if (fs.lstatSync(filePath).isDirectory()) {
//     // console.log(path);
//     const relativePath = path.relative(__dirname, path.resolve(filePath));
//     const clazz = require(relativePath).default;
//     const instance: Controller = new clazz();
//     console.log(instance.constructor.name);
//     // console.log(clazz.constructor.name);
//   }
// // });
// new ApiLambdaFactory("test").generate("./src/api/controllers");
