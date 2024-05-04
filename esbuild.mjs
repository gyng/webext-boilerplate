/* eslint-env node */
// @ts-check

import * as esbuild from "esbuild";
import { execSync } from "child_process";

const tryCopyStatic = () => {
  try {
    execSync("sh ./copystatic.sh");
  } catch (err) {
    console.warn(
      "copystatic.sh failed; manually copy dist/index-*.html to dist/src/options/index.html to update options page"
    );
  }
};

const ctx = await esbuild
  .context({
    entryPoints: [
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
  })
  .catch(() => process.exit(1));

await ctx
  .rebuild()
  .then((result) => {
    if (result.errors && result.errors.length > 0) {
      console.error(result.errors);
    }
    if (result.warnings && result.warnings.length > 0) {
      console.warn(result.warnings);
    }
    tryCopyStatic();
    console.log(`Built @ ${new Date().toISOString()};`);
  })
  .catch(() => process.exit(1));

if (process.env["WATCH"]) {
  console.log("Watch mode enabled...");
  ctx.watch({
    onRebuild: (result) => {
      if (result.errors && result.errors.length > 0) {
        console.error(result.errors);
      }
      if (result.warnings && result.warnings.length > 0) {
        console.warn(result.warnings);
      }

      tryCopyStatic();
      console.log(`Rebuilt @ ${new Date().toISOString()};`);
    },
  });
} else {
  process.exit(0);
}
