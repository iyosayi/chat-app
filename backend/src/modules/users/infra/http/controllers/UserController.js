import { handleError, handleSuccess } from "@utils/utils";
import container from "@shared/container/index";
import { StatusCodes } from "http-status-codes";

export default class UserController {
  async me(req, res) {
    try {
      const id = req.user;
      const user = await container.resolve("getUserService").getById({ id });
      return handleSuccess(
        req,
        res,
        StatusCodes.OK,
        user,
        "User retrieved successfully"
      );
    } catch (error) {
      return handleError(req, res, error.statusCode, error.message);
    }
  }

  async create(req, res) {
    try {
      const { ...params } = req.body;
      const user = await container
        .resolve("createUserService")
        .execute({ ...params });
      return handleSuccess(
        req,
        res,
        StatusCodes.CREATED,
        user,
        "User created successfully"
      );
    } catch (error) {
      return handleError(req, res, error.statusCode, error.message);
    }
  }

  async getAll(req, res) {
    try {
      const user = await container.resolve("getUserService").execute();
      return handleSuccess(
        req,
        res,
        StatusCodes.OK,
        user,
        "Users retrieved successfully"
      );
    } catch (error) {
      return handleError(req, res, error.statusCode, error.message);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await container
        .resolve("authenticationService")
        .execute({ email, password });
      return handleSuccess(
        req,
        res,
        StatusCodes.OK,
        user,
        "Users logged in successfully"
      );
    } catch (error) {
      return handleError(req, res, error.statusCode, error.message);
    }
  }
}
