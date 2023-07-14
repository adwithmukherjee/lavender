import DynamoDB from "aws-sdk/clients/dynamodb";
import { BaseItem } from "./Base.model";

export class User extends BaseItem {
  username: string;
  name: string;
  followerCount: number;
  followingCount: number;

  constructor(params: {
    username: string,
    name?: string,
    followerCount?: number,
    followingCount?: number
  }) {
    super();
    this.username = params.username;
    this.name = params.name || "";
    this.followerCount = params.followerCount || 0;
    this.followingCount = params.followingCount || 0;
  }

  static fromItem(item?: DynamoDB.AttributeMap): User {
    if (!item) throw new Error("No item!");
    return new User({
      username: item.username.S,
      name: item.name.S,
      followerCount: Number(item.followerCount.N),
      followingCount: Number(item.followingCount.N),
    });
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
