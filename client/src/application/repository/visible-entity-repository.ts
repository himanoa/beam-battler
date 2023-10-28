import { Renderable } from "../../models/renderable";

export interface VisibleEntityRepository<T extends Renderable> {
  store(entity: T): void
  drop(id: string): void
  update(id: string, entity: T): void
  resolve(id: string): void
  [Symbol.iterator](): IterableIterator<T>
}
