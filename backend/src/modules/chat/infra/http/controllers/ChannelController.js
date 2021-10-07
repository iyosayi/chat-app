import { handleError, handleSuccess } from "@utils/utils";
import container from "@shared/container/index";
import { StatusCodes } from "http-status-codes";

export default class ChannelController {
  async create(req, res) {
    try {
      const { ...params } = req.body;
      const channel = await container
        .resolve("createChannelService")
        .execute({ ...params });
      return handleSuccess(
        req,
        res,
        StatusCodes.CREATED,
        channel,
        "Channel created successfully"
      );
    } catch (error) {
      return handleError(req, res, error.statusCode, error.message);
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const channel = await container
        .resolve("getChannelService")
        .getById({ id });
      return handleSuccess(
        req,
        res,
        StatusCodes.OK,
        channel,
        "Channel retrieved successfully"
      );
    } catch (error) {
      return handleError(req, res, error.statusCode, error.message);
    }
  }

  async getAll(req, res) {
    try {
      const channel = await container.resolve("getChannelService").execute();
      return handleSuccess(
        req,
        res,
        StatusCodes.OK,
        channel,
        "Channels retrieved successfully"
      );
    } catch (error) {
      return handleError(req, res, error.statusCode, error.message);
    }
  }

  async getMessages(req, res) {
    try {
      const { channelId } = req.params;
      const channel = await container
        .resolve("getChannelService")
        .getChannelMessages({ channelId });
      return handleSuccess(
        req,
        res,
        StatusCodes.OK,
        channel,
        "Messages retrieved successfully"
      );
    } catch (error) {
      return handleError(req, res, error.statusCode, error.message);
    }
  }
}
