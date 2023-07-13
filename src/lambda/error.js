const api = require("lambda-api")();

api.get("/", () => {
  return { status: "error" };
});


const handler = async (event, context) => {
  return await api.run(event, context);
};

module.exports = {
  handler,
};
