import UserController from "../controllers/UserController";
import ensureAuthenticated from "@shared/middleware/ensureAuthenticated";
import { createUserSchema, loginSchema } from "../validations/user.validation";
import { Router } from "express";
import { idParams } from "@modules/chat/infra/http/validation/channel.validation";

const router = Router();
const userController = new UserController();

router
  .route("/")
  .get(ensureAuthenticated, userController.getAll)
  .post(createUserSchema, userController.create);

router.post("/auth", loginSchema, userController.login);
router.route("/:id").get(idParams, ensureAuthenticated, userController.me);
export default router;
