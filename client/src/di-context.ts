import { createContext, useContext } from "react";
import { SceneController } from "./scene";
import { VisibleEntityRepository } from "./application/repository/visible-entity-repository";
import { Renderable } from "./models/renderable";

export type ServiceLocator = {
  visibleEntityRepository: VisibleEntityRepository<Renderable>,
  sceneController: SceneController
}

export const DIContext =  createContext<ServiceLocator | null>(null)

export const useDIContext = () => {
  const locator= useContext(DIContext)
  if(locator == null) {
    throw new Error("locator is not provided")
  }
  return locator
}
