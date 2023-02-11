import "tsconfig-paths/register";
import "dotenv/config";
import app from "@root/server";
import { createDbConnection } from "@database/createConnection";

void (async () => {
  try {
    await createDbConnection();
    app.listen(parseInt(process.env.PORT.toString()), () => {
      console.log(`Server started on localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
