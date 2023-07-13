import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb"
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
  constructor(scope: cdk.App, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const errorLambda = new NodejsFunction(this, "ErrorLambda", {
      entry: "../src/lambda/error.ts",
      functionName: "errorLambda",
      handler: "handler",
      memorySize: 1024,
      tracing: lambda.Tracing.ACTIVE,
      runtime: lambda.Runtime.NODEJS_16_X,
    });

    const testLambda = new NodejsFunction(this, "TestLambda", {
      entry: "../src/lambda/index.ts",
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
    restApi.root.addResource("{proxy+}").addMethod("ANY", errorController);

    new ARecord(this, "TestApiARecord", {
      zone: zone,
      recordName: "api",
      target: RecordTarget.fromAlias(
        new ApiGateway(restApi)
      ),
    });

    const dynamoTable = new dynamodb.Table(this, 'TestTable', {
        partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING }, 
        sortKey: { name: "SK", type: dynamodb.AttributeType.STRING }, 
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, 
        removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    dynamoTable.addGlobalSecondaryIndex({
        indexName: "GSI1",
        partitionKey: { name: "GSI1PK", type: dynamodb.AttributeType.STRING },
        sortKey: { name: "GSI1SK", type: dynamodb.AttributeType.STRING },
        projectionType: dynamodb.ProjectionType.KEYS_ONLY
    })

    dynamoTable.grantReadWriteData(testLambda)
        
  }
}

export default CdkStack;
