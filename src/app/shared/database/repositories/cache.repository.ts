import { RedisConnection } from "../../../../main/database/redis.connection";
import { Recado } from "../../../models/recado.model";
import { Usuario } from "../../../models/usuario.model";

export class CacheRepository {
  private redis = RedisConnection.connection;

  public async get(key: string): Promise<any | null> {
    const result = await this.redis.get(key);

    if (!result) return null;

    return JSON.parse(result);
  }

  public async set(key: string, value: any): Promise<void | Usuario | Recado> {
    await this.redis.set(key, JSON.stringify(value));
  }

  public async setEX(key: string, value: any, ttl: number): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), "EX", ttl);
  }

  public async del(key: string): Promise<void | Usuario | Recado> {
    await this.redis.del(key);
  }
}
