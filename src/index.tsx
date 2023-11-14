import { createRoot } from "react-dom/client";
import { App } from "./infra/web-app/App";
import { ItemsProvider } from "./infra/web-app/contexts/Items/itemContext";

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(
  <ItemsProvider>
    <App />
  </ItemsProvider>
);
