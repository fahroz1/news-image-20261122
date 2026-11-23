// THE WORLD — Sunday, 22 November 2026.
// Entry program: copies the pre-rendered front page (entry.png) that sits
// next to this file into the output directory, then checks the copy landed
// whole. No network and no drawing at run time, so both runs write
// byte-identical output.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(here, "entry.png");
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Fail loudly instead of shipping a truncated copy.
if (statSync(source).size !== statSync(target).size) {
  throw new Error("entry.png copy is incomplete");
}
