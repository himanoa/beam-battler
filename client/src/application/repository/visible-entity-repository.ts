import { HasCollider } from "../../models/has-collider";
import { Renderable } from "../../models/renderable";

interface X extends Renderable, HasCollider {}

export interface VisibleEntityRepository<T extends X = X> {
  store(entity: T): void;
  drop(id: string): void;
  resolve(id: string): void;
  [Symbol.iterator](): IterableIterator<T>;
}
