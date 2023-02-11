import "tsconfig-paths/register";
import "dotenv/config";
import app from "@root/server";
import { createDbConnection } from "@database/createConnection";

(async () => {
  try {
    await createDbConnection();
    app.listen(parseInt(process.env.PORT as string), () => {
      console.log(
        `Server started on localhost:${parseInt(process.env.PORT as string)}`
      );
    });
  } catch (err) {
    console.error(err);
  }
})();
