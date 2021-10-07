import { handleValidationError } from "@utils/utils";
import Joi from "joi";

export const createUserSchema = async (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().trim().required().label("First name"),
    lastName: Joi.string().trim().required().label("Last name"),
    email: Joi.string().email().lowercase().trim().required().label("email"),
    password: Joi.string().trim().required().label("First name"),
  });
  await handleValidationError(req, res, next, schema.validate(req.body));
};

export const loginSchema = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required().label("email"),
    password: Joi.string().trim().required().label("First name"),
  });
  await handleValidationError(req, res, next, schema.validate(req.body));
};
