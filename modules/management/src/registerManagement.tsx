import { FireflyRuntime, ModuleRegisterFunction } from "@squide/firefly";

export const registerManagement: ModuleRegisterFunction<FireflyRuntime> = runtime => {
    runtime.registerRoute({
        path: "/management",
        lazy: async () => {
            const { ManagementPage } = await import("./ManagementPage.tsx");

            return {
                element: <ManagementPage />
            };
        }
    });

    runtime.registerNavigationItem({
        $label: "Management",
        to: "/management"
    });
};
