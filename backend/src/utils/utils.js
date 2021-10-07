import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
/**
 * Prevents passwords, credit card details etc from being logged.
 * @param body HTTP request body
 */
const removeSensitiveData = ({ password, ...body }) => body;

/**
 * Serializes an Express request for Bunyan logging
 * @param req Express request object
 */
export const reqSerializer = (req) => {
  try {
    if (!req || !req.connection) return req;

    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      origin_service: req.headers ? req.headers["x-origin-service"] : "",
      remoteAddress: req.connection ? req.connection.remoteAddress : "",
      remotePort: req.connection ? req.connection.remotePort : "",
      request_id: req.id,
      ...(req.body || Object.keys(req.body).length !== 0
        ? { body: removeSensitiveData(req.body) }
        : undefined),
    };
  } catch (error) {
    console.log(error);
  }
};

export const handleError = (req, res, code, message, err) => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      JSON.stringify({
        name: "chat-app",
        res: {
          code: parseInt(code, 10),
          status: "failed",
          err,
          message,
        },
        req: reqSerializer(req),
      })
    );

    return res.status(parseInt(code, 10)).json({
      status: "failed",
      message,
    });
  }

  return res.status(parseInt(code, 10)).json({
    status: "failed",
    message,
  });
};

export const handleSuccess = (req, res, code, data, message) => {
  console.log(
    JSON.stringify({
      name: "dabatech",
      res: {
        code: parseInt(code, 10),
        status: "success",
        message,
        data,
      },
      req: reqSerializer(req),
    })
  );
  return res.status(parseInt(code, 10)).json({
    status: "success",
    message,
    data,
  });
};

export const handleValidationError = async (req, res, next, validation) => {
  try {
    const validate = await validation;
    if (validate.error) throw validate.error;
    next();
  } catch (error) {
    return handleError(
      req,
      res,
      StatusCodes.PRECONDITION_FAILED,
      error.details[0].message,
      null
    );
  }
};

export const methodNotAllowedHandler = (req, res) =>
  handleError(req, res, StatusCodes.METHOD_NOT_ALLOWED, "Method not allowed");

export const sanitizeResponse = (data) => {
  try {
    let newObject = JSON.stringify(data);
    newObject = JSON.parse(newObject);
    delete newObject.password;
    delete newObject.__v;

    return newObject;
  } catch (err) {
    console.log(err);
  }
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
