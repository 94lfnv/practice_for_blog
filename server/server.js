import app from "./app";
import config from "./config";

const { SERVER_PORT } = config;

app.listen(SERVER_PORT, () => {
  console.log(`Server started on this port => ${SERVER_PORT}`);
});
