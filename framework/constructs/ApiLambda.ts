import { Stack } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import fs from "fs";
import { API, HandlerFunction, Request, Response } from "lambda-api";
import _ from "lodash";
import Controller from "../api/Controller";
import Route from "../api/Route";
import FileUtils from "../utils/FileUtils";
const path = require("path");

export default class ApiLambda {
  stack: Stack;
  restApi?: RestApi;
  lambdas: NodejsFunction[];

  constructor(params: { stack: Stack; restApi?: RestApi }) {
    this.stack = params.stack;
    this.restApi = params.restApi;
    this.lambdas = [];
  }

  controllerFactory(controllersDir: string) {
    FileUtils.walkDir(controllersDir, (filePath) => {
      if (fs.lstatSync(filePath).isDirectory()) {
        // console.log(path);
        const relativePath = path.relative(__dirname, path.resolve(filePath));
        const instance = require(relativePath).default;
        // console.log(clazz);
        // const instance: Controller = new clazz();
        const lambda = ApiLambda.buildLambdaConstruct({
          controller: instance,
          filePath: filePath + "/index.ts",
          stack: this.stack,
          restApi: this.restApi,
        });
        this.lambdas.push(lambda);
      }
    });
  }

  static buildLambdaConstruct(params: {
    controller: Controller;
    filePath: string;
    stack: Stack;
    restApi?: RestApi;
  }) {
    const clazzName = params.controller.constructor.name;
    const lambda = new NodejsFunction(params.stack, clazzName, {
      entry: params.filePath,
      functionName: clazzName,
      handler: "handler",
      memorySize: 512,
      runtime: Runtime.NODEJS_16_X,
    });

    if (!_.isNil(params.restApi)) {
      this.registerLambdaWithRestApi({
        lambda,
        restApi: params.restApi,
        resources: params.controller.resources,
      });
    }
    return lambda;
  }

  static registerLambdaWithRestApi(params: {
    lambda: NodejsFunction;
    restApi: RestApi;
    resources: string[];
  }) {
    const lambdaController = new LambdaIntegration(params.lambda);
    _.forEach(params.resources, (resource) => {
      params.restApi.root
        .addResource(resource)
        .addMethod("ANY", lambdaController);
      params.restApi.root
        .getResource(resource)
        .addResource("{proxy+}")
        .addMethod("ANY", lambdaController);
    });
  }

}