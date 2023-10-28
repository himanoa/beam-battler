import { UiServiceLocatorContext } from "./ui-service-locator-context"
import { createSceneAtom } from "./atoms/sceneAtom";
import { applicationServiceLocator } from './application-service-locator'
import { UiServiceLocator } from "./ui-service-locator";

type Props = { children: React.ReactNode }

export const uiServiceLocator: UiServiceLocator = {
  sceneController: applicationServiceLocator.sceneController,
  sceneAtom: createSceneAtom(applicationServiceLocator.sceneController),
  visibleEntityRepository: applicationServiceLocator.visibleEntityRepository
}

export function UiServiceLocatorProvider({children}: Props): JSX.Element {
  return <UiServiceLocatorContext.Provider value={uiServiceLocator}>{children}</UiServiceLocatorContext.Provider>
}
