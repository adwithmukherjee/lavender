import DynamoDB from "aws-sdk/clients/dynamodb";
import { getClient } from "../getClient";
import { User } from "../models/User.model";

class UserQueries {
  client: DynamoDB;

  constructor() {
    this.client = getClient()
  }

  createUser(user: User) {
    return this.client.putItem({
      TableName: "TestTable",
      Item: user.toItem(),
      ConditionExpression: "attribute_not_exists(PK)",
    })
    .promise()
    .then(() => {
      return user
    })
  }
}

export default UserQueries