import { runServer } from "./main/server";
import { DatabaseConnection } from "./main/database/typeorm.connection";
import { RedisConnection } from "./main/database/redis.connection";

Promise.all([DatabaseConnection.connect(), RedisConnection.connect()])
  .then(runServer)
  .catch((error: Error) => {
    console.log("Erro ao iniciar");
    console.log(error);
  });
