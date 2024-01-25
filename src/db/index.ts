import { JsonDB, Config } from 'node-json-db';

class DataBase {
  private db: JsonDB;

  constructor (filename: string) {
    this.db = new JsonDB(new Config(filename, true, true, '/'));
  }

  public async getAll<T> (collection: string): Promise<T[]> {
    return this.db.getObject<T[]>(`/${collection}`);
  }

  public async get<T> (collection: string, index: number): Promise<T> {
    return this.db.getObject<T>(`/${collection}[${index}]`);
  }

  public async create<T> (collection: string, entity: T): Promise<void> {
    return this.db.push(`/${collection}[]`, entity);
  }

  public async delete (collection: string, index: number): Promise<void> {
    return this.db.delete(`/${collection}[${index}]`);
  }

  public async update<T> (collection: string, index: number, updatedEntity: T): Promise<void> {
    return this.db.push(`/${collection}[${index}]`, updatedEntity, true);
  }

  public async getIndex (collection: string, id: number): Promise<number> {
    return await this.db.getIndex(`/${collection}`, id, 'id');
  }

  public async writeAll<T> (collection: string, data: T[]): Promise<void> {
    return await this.db.push(`/${collection}`, data);
  }
}

export default DataBase;
