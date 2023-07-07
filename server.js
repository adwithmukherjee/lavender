const dotenv = require("dotenv");
const ApiServer = require("./src/framework/ApiServer");
// -------------- end imports ----------------

dotenv.config();

const api = new ApiServer();

api.start();

process.on("SIGINT", () => {
    const sleep = 2000;
    console.log(
        `Cleaning up before shutdown -- wait ${sleep / 1000} seconds`
    );
    api.stop();
    setTimeout(() => {
        console.log("Bye!");
        process.exit(0);
    }, sleep);
});