import { APIGatewayProxyEvent, APIGatewayProxyEventV2, Context } from "aws-lambda";
import LambdaApi from "lambda-api";

const api = LambdaApi()

api.get("/test", () => {
  return { status: "ok " };
});

api.get("/health", () => {
  return { status: "healthy" };
});

const handler = async (event: APIGatewayProxyEvent | APIGatewayProxyEventV2, context: Context) => {
  return await api.run(event, context);
};

module.exports = {
  handler,
};
