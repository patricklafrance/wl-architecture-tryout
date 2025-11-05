import { defineDevConfig } from "@workleap/rsbuild-configs";

export default defineDevConfig({
    environmentVariables: {
        "USE_MSW": process.env.USE_MSW === "true",
        "MODULES": process.env.MODULES
    }
});
