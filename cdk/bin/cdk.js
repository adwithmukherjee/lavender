#!/usr/bin/env node
const cdk = require("aws-cdk-lib");
const { CdkStack } = require("../lib/cdk-stack");

const app = new cdk.App();
new CdkStack(app, "CdkStack", {
    env: {
        account: "835097954124",
        region: "us-east-1",
    },
});
