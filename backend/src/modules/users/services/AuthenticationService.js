import { env } from "@config/environment";
import { InvalidPropertyError } from "@shared/errors/ErrorClass";
import { sanitizeResponse } from "@utils/utils";
import { sign } from "jsonwebtoken";
import { comparePassword } from "@utils/utils";
export default class AuthenticationService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findOne({
      email: email.toLowerCase(),
    });
    if (!user) {
      throw new InvalidPropertyError("User with this email does not exist.");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new InvalidPropertyError("Password is incorrect");
    }
    const token = sign({ email: user.email, id: user._id }, env.JWT_SECRET, {
      subject: String(user._id),
      expiresIn: env.JWT_EXPIRATION,
    });
    return { user: sanitizeResponse(user), token };
  }
}
