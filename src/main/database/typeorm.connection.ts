import "reflect-metadata";
import { DataSource } from "typeorm";

import config from "../config/database.config";

export class DatabaseConnection {
  private static _connection: DataSource;

  public static async connect(): Promise<void> {
    {
      if (!this._connection?.isInitialized) {
        this._connection = await config.initialize();
      }
      console.log("Conectado ao DB");
    }
  }

  public static get connection() {
    if (!this._connection) {
      throw new Error("DB não conectado");
    }

    return this._connection;
  }

  public static async closeConnection(): Promise<void> {
    if (this._connection) {
      await this._connection.destroy();
    }
  }
}
