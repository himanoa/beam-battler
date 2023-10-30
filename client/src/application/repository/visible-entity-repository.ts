import { Renderable } from "../../models/renderable";

interface Entities extends Renderable {}

export interface VisibleEntityRepository<T extends Entities = Entities> {
  store(entity: T): void;
  drop(id: string): void;
  resolve(id: string): T | null;
  [Symbol.iterator](): IterableIterator<T>;
}
