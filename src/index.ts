import { runServer } from "./main/server";
import { DatabaseConnection } from "./main/database/typeorm.connection";

Promise.all([DatabaseConnection.connect()])
  .then(runServer)
  .catch((error: Error) => {
    console.log("Erro ao iniciar");
    console.log(error);
  });
