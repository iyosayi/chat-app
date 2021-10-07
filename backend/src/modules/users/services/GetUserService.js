import { sanitizeResponse } from "@utils/utils";

export default class GetUserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }
  async execute() {
    return this.userRepository.findAll();
  }

  async getById({ id }) {
    const user = await this.userRepository.findById({ id });
    return sanitizeResponse(user);
  }
}
