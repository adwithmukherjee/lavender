import ApiLambdaFactory from "../framework/constructs/ApiLambda";
import FileUtils from "../framework/utils/FileUtils";

// const api = new ApiLambda("test");

// api.register("./src/api/controllers/health");

// const poop = require("./api/controllers/health");
// console.log(poop);

FileUtils.walkDir("./api/controllers", (path) => {
  console.log("PATH", path);
});
