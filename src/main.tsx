import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CacheManagerProvider } from "./context/CacheManagerContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CacheManagerProvider>
    <App />
  </CacheManagerProvider>
);
