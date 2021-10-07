import { env } from "@config/environment";
import { UniqueConstraintError } from "@shared/errors/ErrorClass";
import { sign } from "jsonwebtoken";
import { sanitizeResponse } from "@utils/utils";
import faker from 'faker'

export default class CreateUserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }
  async execute({ email, password, firstName, lastName }) {
    const emailExists = await this.userRepository.findOne({ email });
    if (emailExists) {
      throw new UniqueConstraintError("User with this email exist.");
    } 

    const user = await this.userRepository.insert({
      email: email.toLowerCase(),
      firstName,
      lastName,
      password,
      imageUrl: faker.image.imageUrl()
    });
    const token = sign({ email: user.email, id: user._id }, env.JWT_SECRET, {
      subject: String(user._id),
      expiresIn: env.JWT_EXPIRATION,
    });
    return {user: sanitizeResponse(user), token };
  }
}
