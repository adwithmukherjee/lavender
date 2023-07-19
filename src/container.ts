import { createContainer } from "awilix/lib/container";
import { Lifetime } from "awilix/lib/lifetime";
import { asClass, asFunction } from "awilix/lib/resolvers";
import UserRepository from "./dal/repositories/User.repo";
import { getClient } from "./dal/getClient";
import GetUser from "./app/users/GetUser";

const container = createContainer();

// this is where the services used for ALL lambdas are instantiated, then injected to Controller

container.register({
  db: asFunction(getClient).setLifetime(Lifetime.SINGLETON),
  userRepository: asClass(UserRepository).setLifetime(Lifetime.SINGLETON),
  getUser: asClass(GetUser),
  
});




export default container;