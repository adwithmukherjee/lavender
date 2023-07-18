import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { ApiGateway } from "aws-cdk-lib/aws-route53-targets";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { CfnOutput } from "aws-cdk-lib";
import ApiLambda from "../framework/constructs/ApiLambda";

class CdkStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope: cdk.App, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const zone = HostedZone.fromLookup(this, "TestHostedZone", {
      domainName: "adwith.co",
    });

    const restApi = new RestApi(this, "TestApiGateway", {
      domainName: {
        domainName: "api.adwith.co",
        certificate: Certificate.fromCertificateArn(
          this,
          "TestCert",
          "arn:aws:acm:us-east-1:835097954124:certificate/7e1e1cfb-f8e9-4682-b197-a6863ea9cc74"
        ),
      },
    });

    new ARecord(this, "TestApiARecord", {
      zone: zone,
      recordName: "api",
      target: RecordTarget.fromAlias(new ApiGateway(restApi)),
    });

    
    new ApiLambda({ stack: this, restApi }).controllerFactory("./src/api/controllers");


    // const dynamoTable = new dynamodb.Table(this, "TestTable", {
    //   tableName: "TestTable",
    //   partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING },
    //   sortKey: { name: "SK", type: dynamodb.AttributeType.STRING },
    //   billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    // });

    // dynamoTable.addGlobalSecondaryIndex({
    //   indexName: "GSI1",
    //   partitionKey: { name: "GSI1PK", type: dynamodb.AttributeType.STRING },
    //   sortKey: { name: "GSI1SK", type: dynamodb.AttributeType.STRING },
    //   projectionType: dynamodb.ProjectionType.KEYS_ONLY,
    // });

    // dynamoTable.grantFullAccess(userLambda);
    // userLambda.addToRolePolicy(
    //   new PolicyStatement({
    //     actions: ["dynamodb:*"],
    //     resources: [dynamoTable.tableArn],
    //   })
    // );
  }
}

export default CdkStack;
