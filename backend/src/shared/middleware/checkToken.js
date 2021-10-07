import { env } from "@config/environment";
import { verify } from "jsonwebtoken";
import container from "@shared/container";

export default async function checkBearerToken(req) {
  try {
    let token = null;
    if (req.headers.authorization) {
      token = req.headers.authorization;
      const tokenArray = token.split(" ");
      token = tokenArray[1];
    }
    if (req.query.token) {
      token = req.query.token;
    }
    if (req.body.token) {
      token = req.body.token;
    }
    if (!token) {
      return {
        status: "failed",
        message: "Authorization failed, no token found",
      };
    }

    const decryptedToken = verify(token, env.JWT_SECRET);
    const user = await container.resolve("userRepository").findById({id: decryptedToken.id,});

    if (user) {
      return {
        status: "success",
        data: user,
      };
    }
    return {
      status: "failed",
      message: "No user data found for this token",
    };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        status: "failed",
        message: "Token expired",
      };
    }
    return {
      status: "failed",
      message: "Failed to authenticate token",
    };
  }
}
