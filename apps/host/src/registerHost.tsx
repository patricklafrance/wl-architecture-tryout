import { type FireflyRuntime, type ModuleRegisterFunction } from "@squide/firefly";
import { HomePage } from "./HomePage.tsx";

export const registerHost: ModuleRegisterFunction<FireflyRuntime> = runtime => {
    runtime.registerRoute({
        index: true,
        element: <HomePage />
    });

    runtime.registerNavigationItem({
        $label: "Home",
        to: "/"
    });
};
