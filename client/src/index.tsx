import { createRoot } from "react-dom/client";
import cls from "./index.module.css";
import { UiServiceLocatorProvider } from "./ui-service-locator-provider";
import { SceneRenderer } from "./scene";

const el = document.querySelector("#app");

function Root(): JSX.Element {
  return (
    <UiServiceLocatorProvider>
      <App />
    </UiServiceLocatorProvider>
  );
}

function App(): JSX.Element {
  return (
    <div className={`${cls.container} ${cls.theme}`}>
      <SceneRenderer />
    </div>
  );
}

if (el) {
  createRoot(el).render(<Root />);
}
