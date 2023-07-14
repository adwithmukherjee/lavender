#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import CdkStack from "../lib/CdkStack";
const app = new cdk.App();

new CdkStack(app, "CdkStack", {
  env: {
    account: "835097954124",
    region: "us-east-1",
  },
});


