/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
// @ts-check

const esbuild = require("esbuild");
const { execSync } = require("child_process");

esbuild
  .build({
    entryPoints: [
      "./vendor/index.ts",
      "./src/background/index.ts",
      "./src/content/index.ts",
      "./src/options/index.tsx",
    ],
    loader: {
      ".html": "file",
    },
    bundle: true,
    target: ["chrome58", "firefox57"],
    outdir: "./dist",
    sourcemap: "inline",
    define: {
      "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
    },
    watch: process.env["WATCH"]
      ? {
          onRebuild: () => {
            try {
              execSync("bash ./copystatic.sh");
            } catch (err) {
              console.warn(
                "copystatic.sh failed; manually copy dist/index-*.html to dist/src/options/index.html to update options page"
              );
            }
            console.log(`Rebuilt @ ${new Date().toISOString()};`);
          },
        }
      : false,
  })
  .catch(() => process.exit(1));