import { DeepPartial } from 'typeorm';

import type { BaseEntity } from '../entities/BaseEntity.entity';
import type BaseRepository from '../repositories/base.repository';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

type BaseServiceContext<Entity extends BaseEntity> = {
  repository: BaseRepository<Entity>
}

class BaseService<Entity extends BaseEntity> {
  private repository: BaseRepository<Entity>;

  constructor ({ repository }: BaseServiceContext<Entity>) {
    this.repository = repository;
  }

  public async getAll (): Promise<Entity[]> {
    return this.repository.getAll();
  }

  public async create (data: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.create(data);
  }

  public async delete (index: number): Promise<void> {
    return this.repository.delete(index);
  }

  public async update (index: number, newEntityData: QueryDeepPartialEntity<Entity>): Promise<Entity> {
    return this.repository.update(index, newEntityData);
  }
}

export default BaseService;
