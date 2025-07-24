import app from "./app";
import { env } from "./config/config";
import connectDB from "./db/db";

const port = Number(env.PORT ?? 3000);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message)
    process.exit(1);
  });
