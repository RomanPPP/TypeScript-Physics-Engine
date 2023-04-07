import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";

import CustomizedMenus from "./Menu";

const root = ReactDOM.createRoot(document.getElementById("ui") as HTMLElement);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CustomizedMenus
        configData={(window as any).config}
        debugData={(window as any).Debug}
      />
    </StyledEngineProvider>
  </React.StrictMode>
);
