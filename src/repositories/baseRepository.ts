import DataBase from '../db';

class BaseRepository<T> {
  private collection: string;
  private db: DataBase;

  constructor (collection: string, db: DataBase) {
    this.collection = collection;
    this.db = db;
  }

  public async getAll (): Promise<T[]> {
    return this.db.getAll(this.collection);
  }

  public async get (index: number): Promise<T> {
    return this.db.get(this.collection, index);
  }

  public async create (entity: T): Promise<void> {
    return this.db.create(this.collection, entity);
  }

  public async delete (index: number): Promise<void> {
    return this.db.delete(this.collection, index);
  }

  public async update (index: number, updatedEntity: T): Promise<void> {
    return this.db.update(this.collection, index, updatedEntity);
  }

  public async getIndex (id: number): Promise<number> {
    return await this.db.getIndex(this.collection, id);
  }
}

export default BaseRepository;
