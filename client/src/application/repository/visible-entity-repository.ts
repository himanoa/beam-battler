import { Renderable } from "../../models/renderable";

export interface VisibleEntityRepository<T extends Renderable = Renderable> {
  store(entity: T): void;
  drop(id: string): void;
  resolve(id: string): void;
  [Symbol.iterator](): IterableIterator<T>;
}
