import { Controller } from "@lavender/sls-framework";
import HealthController from "./HealthController";
import container from "../../../container";
import { Lifetime, asClass } from "awilix";

container.register({
  // TODO: rename to entry and export container from here to 
  // be imported into ApiLambda so ApiLambda accesses controller
  // from awilix container
  controller: asClass(HealthController).setLifetime(Lifetime.SINGLETON),
});


export const handler = Controller.handler(container.cradle.controller);
export default container.cradle.controller;