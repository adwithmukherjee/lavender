import { createContainer, asClass, Lifetime } from "awilix";
import TestEvent from "./app/TestEvent";
import UserRepository from "./dal/repositories/User.repo";

const container = createContainer();

container.register({
  userRepository: asClass(UserRepository).setLifetime(Lifetime.SINGLETON),
});


export default container;