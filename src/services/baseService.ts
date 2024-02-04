import type BaseRepository from '../repositories/baseRepository';

type Config<T> = {
  repository: BaseRepository<T>
}

class BaseService<T extends { id: number }, C, U> {
  private repository: BaseRepository<T>;

  constructor ({ repository }: Config<T>) {
    this.repository = repository;
  }

  public async getAll (): Promise<T[]> {
    return this.repository.getAll();
  }

  public async create (data: C): Promise<T> {
    const lastEntity: T = await this.repository.get(-1);
    const newEntity: T = {
      // TODO - update type conversion
      ...data as unknown as T,
      id: lastEntity.id + 1,
    };
    await this.repository.create(newEntity);
    return newEntity;
  }

  public async delete (index: number): Promise<void> {
    return this.repository.delete(index);
  }

  public async update (index: number, entity: T, newEntityData: U): Promise<T> {
    const updatedEntity: T = {
      ...entity,
      ...newEntityData,
    };
    await this.repository.update(index, updatedEntity);
    return updatedEntity;
  }
}

export default BaseService;
