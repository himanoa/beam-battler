import { useMemo } from "react";
import { DIContext, ServiceLocator } from "./DIContext";
import { createStore } from "jotai";
import { SceneControllerImpl } from "./scene";

type Props = {
  children: React.ReactNode
}
export function ApplicationDIContextProvider({children}: Props): JSX.Element {
  const locator = useMemo<ServiceLocator>(() => {
    throw new Error("unimplemented")
  }, [])

  return <DIContext.Provider value={locator}>{children}</DIContext.Provider>
}
