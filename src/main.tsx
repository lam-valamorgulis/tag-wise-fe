import { ConfigProvider, theme } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Auth0ProviderWithNavigate } from "./components/Auth0ProviderWithNavigate.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <ConfigProvider
          theme={{
            components: {
              Typography: {
                titleMarginBottom: "0",
              },
              Table: {
                borderColor: "rgb(203,213,225)",
              },
            },
            token: {
              fontSize: 14,
              sizeStep: 4,
            },
            algorithm: theme.compactAlgorithm,
          }}
        >
          <App />
        </ConfigProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>
);
