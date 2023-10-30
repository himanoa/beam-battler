import { HasCollider } from "../../models/has-collider";
import { Renderable } from "../../models/renderable";
import { VisibleEntityRepository } from "./visible-entity-repository";

interface X extends Renderable, HasCollider {}

export class VisibleEntityRepositoryImpl<T extends X>
  implements VisibleEntityRepository<T>
{
  constructor(private stateMap: Map<string, T> = new Map()) {}

  store(entity: T) {
    this.stateMap.set(entity.id, entity);
  }

  drop(id: string) {
    this.stateMap.delete(id);
  }

  resolve(id: string) {
    this.stateMap.get(id);
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.stateMap.values();
  }
}
