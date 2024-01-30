import { JsonDB, Config } from 'node-json-db';

import type { DataBaseI } from '../types/database';

class DataBase implements DataBaseI {
  private db: JsonDB;

  constructor (filename: string) {
    this.db = new JsonDB(new Config(filename, true, true, '/'));
  }

  async getAll<T> (collection: string): Promise<T[]> {
    return this.db.getObject<T[]>(`/${collection}`);
  }

  async get<T> (collection: string, index: number): Promise<T> {
    return this.db.getObject<T>(`/${collection}[${index}]`);
  }

  async create<T> (collection: string, entity: T): Promise<void> {
    return this.db.push(`/${collection}[]`, entity);
  }

  async delete (collection: string, index: number): Promise<void> {
    return this.db.delete(`/${collection}[${index}]`);
  }

  async update<T> (collection: string, index: number, updatedEntity: T): Promise<void> {
    return this.db.push(`/${collection}[${index}]`, updatedEntity, true);
  }

  async getIndex (collection: string, id: number): Promise<number> {
    return await this.db.getIndex(`/${collection}`, id, 'id');
  }
}

export default DataBase;
