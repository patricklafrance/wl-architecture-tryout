import "./index.css";

import { HopperProvider } from "@hopper-ui/components";
import { registerShell } from "@packages/shell";
import { FireflyProvider, initializeFirefly } from "@squide/firefly";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { getActiveModules } from "./getActiveModules.ts";
import { QueryProvider } from "./QueryProvider.tsx";
import { registerHost } from "./registerHost.tsx";

const activeModules = getActiveModules(process.env.MODULES);

const fireflyRuntime = initializeFirefly({
    useMsw: !!process.env.USE_MSW,
    localModules: [registerShell, registerHost, ...activeModules],
    startMsw: async () => {
        // Files that includes an import to the "msw" package are included dynamically to prevent adding
        // unused MSW stuff to the code bundles.
        (await import("./startMsw.ts")).startMsw(fireflyRuntime.requestHandlers);
    }
});

const root = createRoot(document.getElementById("root")!);

root.render(
    <StrictMode>
        <FireflyProvider runtime={fireflyRuntime}>
            <HopperProvider withBodyStyle>
                <QueryProvider>
                    <App />
                </QueryProvider>
            </HopperProvider>
        </FireflyProvider>
    </StrictMode>
);
