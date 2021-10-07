import { asClass, asFunction, createContainer, InjectionMode } from "awilix";
import GetChannelService from "@modules/chat/services/GetChannelsService";
import GetUserService from "@modules/users/services/GetUserService";
import AuthenticationService from "@modules/users/services/AuthenticationService";
import CreateUserService from "@modules/users/services/CreateUserService";
import CreateChannelService from "@modules/chat/services/CreateChannelService";
import UserRepository from "@modules/users/infra/mongo/repository/UserRepository";
import ChannelRepository from "@modules/chat/infra/mongo/repository/ChannelRepository";
import { comparePassword } from "@utils/utils";

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  getUserService: asClass(GetUserService).singleton(),
  getChannelService: asClass(GetChannelService).singleton(),
  authenticationService: asClass(AuthenticationService).singleton(),
  createUserService: asClass(CreateUserService).singleton(),
  createChannelService: asClass(CreateChannelService).singleton(),
  userRepository: asClass(UserRepository).singleton(),
  channelRepository: asClass(ChannelRepository).singleton(),
  hashProvider: asFunction(comparePassword),
});

export default container;
