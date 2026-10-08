import "dotenv/config";

import app from "./app";
import { env } from "./config/env";

const PORT = Number(env.PORT) || 3075;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});