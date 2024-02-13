import { DeepPartial, FindOptionsWhere, Repository, ObjectLiteral } from 'typeorm';
import { BaseEntity } from '../entity/BaseEntity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

type BaseRepositoryConfig<Entity extends ObjectLiteral> = {
  repository: Repository<Entity>;
}

abstract class BaseRepository<Entity extends BaseEntity> {
  protected repository: Repository<Entity>;

  constructor ({ repository }: BaseRepositoryConfig<Entity>) {
    this.repository = repository;
  }

  public async getAll (): Promise<Entity[]> {
    return this.repository.find();
  }

  public async get (id: number): Promise<Entity> {
    // doesn't seem there is a way to avoid this casting?
    // https://github.com/typeorm/typeorm/issues/8939
    const options = { id } as FindOptionsWhere<Entity> ;
    return this.repository.findOneBy(options);
  }

  public async create (entity: DeepPartial<Entity>): Promise<Entity> {
    const created = this.repository.create(entity);
    return this.repository.save(created);
  }

  public async delete (id: number): Promise<void> {
    await this.repository.delete(id);
  }

  public async update (id: number, updatedEntity: QueryDeepPartialEntity<Entity>): Promise<Entity> {
    await this.repository.update(id, updatedEntity);
    return this.get(id);
  }
}

export default BaseRepository;
