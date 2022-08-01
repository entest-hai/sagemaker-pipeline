#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CdkModelDeployStack } from "../lib/model-endpont-stack";
import { CicdPipeline, LambdaRecordModelName } from "../lib/cicd-pipeline";

const app = new cdk.App();

// lambda record model name
const recordModelNameLambda = new LambdaRecordModelName(
  app,
  "LambdaRecordModelname",
  {}
);

// sagemaker endpoint stack
new CdkModelDeployStack(app, "CdkModelDeployStack", {});

// cicd pipeline stack
new CicdPipeline(app, "CiCdPipelineForSageMaker", {
  codeStartId: "f8487d2f-fbf7-4604-8d4c-e672b7d38cf4",
  sageMakerRole: `arn:aws:iam::${process.env.CDK_DEFAULT_ACCOUNT}:role/RoleForNoteBook`,
  lambdaArn: recordModelNameLambda.lambadArn,
});
