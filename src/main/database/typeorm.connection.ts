import "reflect-metadata";
import { DataSource } from "typeorm";

import config from "../config/database.config";

export class DatabaseConnection {
  private static _connection: DataSource;

  public static async connect() {
    if (!this._connection) {
      this._connection = await config.initialize();
      console.log("Conectado ao DB");
    }
  }

  public static get connection() {
    if (!this._connection) {
      throw new Error("DB não conectado");
    }

    return this._connection;
  }

  public static async destroy() {
    if (!this._connection) {
      throw new Error("DB não conectado");
    }
    console.log("destruindo a conexão");

    await this._connection.destroy();

    console.log("conexão destruída");
  }
}
