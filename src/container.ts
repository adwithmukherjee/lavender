import { createContainer, asClass } from "awilix";
import TestEvent from "./app/TestEvent";

const container = createContainer();

container.register({
  testEvent: asClass(TestEvent),
});


export default container;