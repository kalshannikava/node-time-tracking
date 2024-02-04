import type { DataBaseType } from '../../types/database';
import { dbMock } from './mockData';

class MockDataBase implements DataBaseType {
  getAll<T>(collection: string): Promise<T[]> {
    return new Promise((resolve) => resolve(dbMock[collection]));
  }
  get<T>(collection: string, index: number): Promise<T> {
    return new Promise((resolve) => {
      if (index === -1) {
        resolve(dbMock[collection][dbMock[collection].length - 1])
      } else {
        resolve(dbMock[collection][index])
      }
    });
  }
  create<T>(collection: string, entity: T): Promise<void> {
    return new Promise((resolve) => resolve(dbMock[collection].push(entity)));
  }
  delete(collection: string, index: number): Promise<void> {
    return new Promise((resolve) => {
      dbMock[collection].splice(index, 1);
      resolve();
    });
  }
  update<T>(collection: string, index: number, updatedEntity: T): Promise<void> {
    return new Promise((resolve) => {
      dbMock[collection].splice(index, 1, updatedEntity);
      resolve();
    });
  }
  getIndex<T extends { id: number }>(collection: string, id: number): Promise<number> {
    return new Promise((resolve) => resolve(dbMock[collection].findIndex((entry: T) => entry.id === id)));
  }

}

export default MockDataBase;
