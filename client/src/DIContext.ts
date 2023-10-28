import { createContext, useContext } from "react";
import { SceneController } from "./scene";

export type ServiceLocator = {
  sceneController: SceneController
}

export const DIContext =  createContext<ServiceLocator | null>(null)

export const useDIContext = () => {
  const locator = useContext(DIContext)
  if(locator == null) {
    throw new Error("locator is not provided")
  }
  return locator
}
