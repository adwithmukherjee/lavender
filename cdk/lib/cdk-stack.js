const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const {
    RestApi, LambdaIntegration,
    // MethodLoggingLevel,
} = require("aws-cdk-lib/aws-apigateway");
const { ARecord, HostedZone, RecordTarget } = require("aws-cdk-lib/aws-route53");
const { Certificate } = require("aws-cdk-lib/aws-certificatemanager");
const { ApiGateway } = require("aws-cdk-lib/aws-route53-targets");

class CdkStack extends cdk.Stack {
    /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
    constructor(scope, id, props) {
        super(scope, id, props);

        const errorLambda = new NodejsFunction(this, "ErrorLambda", {
            entry: "../src/lambda/error.js",
            functionName: "errorLambda",
            handler: "handler",
            memorySize: 1024,
            tracing: lambda.Tracing.ACTIVE,
            runtime: lambda.Runtime.NODEJS_16_X,
        });

        const testLambda = new NodejsFunction(this, "TestLambda", {
            entry: "../src/lambda/index.js",
            functionName: "testLambda", 
            handler: "handler", 
            memorySize: 1024,
            tracing: lambda.Tracing.ACTIVE,
            runtime: lambda.Runtime.NODEJS_16_X,
        });

        const zone = HostedZone.fromLookup(this, "TestHostedZone", {
            domainName: "adwith.co",
        });

        const restApi = new RestApi(this, "TestApiGateway", {
            // deployOptions: {
            //     metricsEnabled: true, 
            //     loggingLevel: MethodLoggingLevel.INFO,
            // },
            domainName:{
                domainName: "api.adwith.co", 
                certificate: Certificate.fromCertificateArn(this, "TestCert", "arn:aws:acm:us-east-1:835097954124:certificate/7e1e1cfb-f8e9-4682-b197-a6863ea9cc74"),
            },
        });

        const healthController = new LambdaIntegration(testLambda);
        const errorController = new LambdaIntegration(errorLambda);
        restApi.root.addResource("health").addMethod("GET", healthController);
        restApi.root.addResource("test").addMethod("GET", healthController);
        restApi.root.addMethod("ANY", errorController);

        new ARecord(this, "TestApiARecord", {
            zone: zone,
            recordName: "api",
            target: RecordTarget.fromAlias(
                new ApiGateway(restApi)
            ),
        });
        
    }
}

module.exports = { CdkStack };
