export interface DataBaseI {
  getAll<T> (collection: string): Promise<T[]>;

  get<T> (collection: string, index: number): Promise<T>;

  create<T> (collection: string, entity: T): Promise<void>;

  delete (collection: string, index: number): Promise<void>;

  update<T> (collection: string, index: number, updatedEntity: T): Promise<void>;

  getIndex (collection: string, id: number): Promise<number>;
}
