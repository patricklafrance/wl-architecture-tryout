import "./index.css";

import { HopperProvider } from "@hopper-ui/components";
import { registerShell } from "@packages/shell";
import { FireflyProvider, initializeFirefly } from "@squide/firefly";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { getActiveModules } from "./getActiveModules.ts";
import { registerHost } from "./registerHost.tsx";

const activeModules = getActiveModules(process.env.MODULES);

const fireflyRuntime = initializeFirefly({
    localModules: [registerShell, registerHost, ...activeModules]
});

const root = createRoot(document.getElementById("root")!);

root.render(
    <StrictMode>
        <FireflyProvider runtime={fireflyRuntime}>
            <HopperProvider withBodyStyle>
                <App />
            </HopperProvider>
        </FireflyProvider>
    </StrictMode>
);
