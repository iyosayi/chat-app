import { handleValidationError } from "@utils/utils";
import Joi from "joi";

export const createChannelSchema = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().required().label("Name"),
    description: Joi.string().trim().required().label("Description"),
    createdBy: Joi.string().trim().required().label("User Id"),
  });
  await handleValidationError(req, res, next, schema.validate(req.body));
};

export const idParams = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().trim().required().label("Id"),
  });
  await handleValidationError(req, res, next, schema.validate(req.params));
};
