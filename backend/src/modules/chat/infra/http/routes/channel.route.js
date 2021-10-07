import ChannelController from "../controllers/ChannelController";
import {
  createChannelSchema,
  idParams,
} from "../validation/channel.validation";
import { Router } from "express";
import ensureAuthenticated from "@shared/middleware/ensureAuthenticated";

const router = Router();
const channelController = new ChannelController();

router
  .route("/")
  .get(ensureAuthenticated, channelController.getAll)
  .post(createChannelSchema, ensureAuthenticated, channelController.create);

router.get("/:id", [idParams, ensureAuthenticated], channelController.getById);
router.get("/chat/:channelId", ensureAuthenticated, channelController.getMessages);

export default router;
