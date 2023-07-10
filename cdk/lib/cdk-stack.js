const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");

class CdkStack extends cdk.Stack {
    /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
    constructor(scope, id, props) {
        super(scope, id, props);

        const testLambda = new NodejsFunction(this, "TestLambda", {
            entry: "../src/lambda/index.js",
            functionName: "testLambda", 
            handler: "handler", 
            memorySize: 1024,
            tracing: lambda.Tracing.ACTIVE,
            runtime: lambda.Runtime.NODEJS_16_X,
        });

        const functionURL = testLambda.addFunctionUrl({
            authType: lambda.FunctionUrlAuthType.NONE, 
            cors: {
                allowedOrigins: ["*"],
            },
        });

        new cdk.CfnOutput(this, "functionURL", {
            value: functionURL.url,
        });
        
    }
}

module.exports = { CdkStack };
