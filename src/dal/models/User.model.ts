import DynamoDB from "aws-sdk/clients/dynamodb";
import { BaseItem } from "./Base.model";

export class User extends BaseItem {
  username: string;
  name: string;
  followerCount: number;
  followingCount: number;

  constructor(
    username: string,
    name?: string,
    followerCount?: number,
    followingCount?: number
  ) {
    super();
    this.username = username;
    this.name = name || "";
    this.followerCount = followerCount || 0;
    this.followingCount = followingCount || 0;
  }

  static fromItem(item?: DynamoDB.AttributeMap): User {
    if (!item) throw new Error("No item!");
    return new User(
      item.username.S,
      item.name.S,
      Number(item.followerCount.N),
      Number(item.followingCount.N)
    );
  }

  get pk(): string {
    return `USER#${this.username}`;
  }

  get sk(): string {
    return `USER#${this.username}`;
  }

  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      username: { S: this.username },
      name: { S: this.name },
      followerCount: { N: this.followerCount.toString() },
      followingCount: { N: this.followingCount.toString() },
    };
  }
}
