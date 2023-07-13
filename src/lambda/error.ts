import LambdaApi from "lambda-api";

const api = LambdaApi();

api.get("*", () => {
  return { status: "error" };
});


const handler = async (event: any, context: any) => {
  return await api.run(event, context);
};

module.exports = {
  handler,
};
