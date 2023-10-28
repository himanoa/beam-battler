import { createContext, useContext } from 'react'
import type { UiServiceLocator } from './ui-service-locator'

export const UiServiceLocatorContext = createContext<UiServiceLocator | null>(null)

export const useUiServiceLocator = () => {
  const sl = useContext(UiServiceLocatorContext)
  if(sl == null) {
    throw new Error("UiServiceLocatorContext is not provided")
  }

  return sl
}
