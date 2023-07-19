import DynamoDB from "aws-sdk/clients/dynamodb";
import { User } from "../models/User.model";

class UserQueries {
  db: DynamoDB;

  constructor({ db }) {
    this.db = db;
  }

  createUser(user: User) {
    return this.db.putItem({
      TableName: "LavenderTable",
      Item: user.toItem(),
      ConditionExpression: "attribute_not_exists(PK)",
    })
      .promise()
      .then(() => {
        return user;
      });
  }
}

export default UserQueries;