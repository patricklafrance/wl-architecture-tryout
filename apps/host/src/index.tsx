import "./index.css";

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
    startMsw: async runtime => {
        // Files that includes an import to the "msw" package are included dynamically to prevent adding
        // unused MSW stuff to the code bundles.
        return (await import("./startMsw.ts")).startMsw(runtime.requestHandlers);
    }
});

const root = createRoot(document.getElementById("root")!);

root.render(
    <StrictMode>
        <FireflyProvider runtime={fireflyRuntime}>
            <QueryProvider>
                <App />
            </QueryProvider>
        </FireflyProvider>
    </StrictMode>
);
