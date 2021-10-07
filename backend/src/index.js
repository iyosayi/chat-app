import server from "./shared/infra/http/server";
import { env } from "@config/environment";
import connections from "@shared/infra/connections";

const startup = async () => {
  try {
    await connections.connectDb();
    server.listen(env.PORT, () => console.log("Listening..."));
  } catch (error) {
    process.exit(0);
  }
};

startup();
