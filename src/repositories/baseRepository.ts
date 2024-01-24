import { Config, JsonDB } from 'node-json-db';

class BaseRepository<T> {
  private collection: string;
  private db: JsonDB;

  constructor (collection: string, filename) {
    this.collection = collection;
    this.db = new JsonDB(new Config(filename, true, true, '/'));
  }

  public async getAll (): Promise<T[]> {
    return this.db.getObject<T[]>(`/${this.collection}`);
  }

  public async get (index: number): Promise<T> {
    return this.db.getObject<T>(`/${this.collection}[${index}]`)
  }

  public async create (entity: T): Promise<void> {
    return this.db.push(`/${this.collection}[]`, entity);
  }

  public async delete (index: number): Promise<void> {
    return this.db.delete(`/${this.collection}[${index}]`);
  }

  public async update (index: number, updatedEntity: T): Promise<void> {
    return this.db.push(`/${this.collection}[${index}]`, updatedEntity, true);
  }
}

export default BaseRepository;
