import { FireflyRuntime, ModuleRegisterFunction } from "@squide/firefly";

export const registerMigration: ModuleRegisterFunction<FireflyRuntime> = runtime => {
    runtime.registerRoute({
        path: "/migration",
        lazy: async () => {
            const { MigrationPage } = await import("./MigrationPage.tsx");

            return {
                element: <MigrationPage />
            };
        }
    });

    runtime.registerNavigationItem({
        $label: "Migration",
        to: "/migration"
    });
};
