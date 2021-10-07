import { Router } from "express";
import userRoutes from "@modules/users/infra/http/routes/user.routes";
import channelRoutes from "@modules/chat/infra/http/routes/channel.route";

const router = new Router();

router.use("/users", userRoutes);
router.use("/channels", channelRoutes);

export default router;
