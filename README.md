## TODOS:

cdk

lambda

wire through dynamo db / dal 

aws client


## Troubleshooting: 

NODE version 18


## how to inject context into lambda

INFRA LAYER: ApiLambda and CDK constructs 

IN BETWEEN: Providers: Controllers and Consumers 

CODE LAYER: 
  Singletons: DB Client, SecretService
  Scoped per request: AuthMiddleware
  Static: Repositories, Actions, other Services

How to inject awilix container into scope of lambda?

something like 

(event, context) => {
  // inject request into container?
  // inject response to resolve into container
  const { events, services } = container
  // invoke events, services
}

handler = (opts) => (event, context) => {
  return Controller.run(opts)
}


