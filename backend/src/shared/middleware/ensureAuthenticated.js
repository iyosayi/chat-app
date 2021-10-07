import checkBearerToken from "./checkToken";
import { UnauthorizedError } from "@shared/errors/ErrorClass";

/**
 * Check Query originates from authentixated resources rights
 */
const ensureAuthenticated = async (req, res, next) => {
  try {
    const token = await checkBearerToken(req);

    if (token.status === "failed") throw new UnauthorizedError(token.message);
    if (token.data) {
      req.user = String(token.data._id);
      next();
    } else {
      throw new UnauthorizedError("Access not granted to this user resource.");
    }
  } catch (err) {
    next(err);
  }
};
export default ensureAuthenticated;
