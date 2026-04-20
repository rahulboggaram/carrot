import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}

function flatten(obj, prefix = []) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const next = [...prefix, k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flatten(v, next));
    } else {
      out[toKebabCase(next.join("-"))] = v;
    }
  }
  return out;
}

function cssVarLine(name, value) {
  if (typeof value === "number") return `  --${name}: ${value};`;
  return `  --${name}: ${value};`;
}

async function main() {
  const repoRoot = path.resolve(__dirname, "..");
  const tokensPath = path.join(repoRoot, "tokens/figma/tokens.json");
  const outPath = path.join(repoRoot, "app/tokens.css");

  const raw = await fs.readFile(tokensPath, "utf8");
  const tokens = JSON.parse(raw);

  const colorVars = flatten(tokens.colors ?? {}, ["color"]);

  const type = tokens.typography ?? {};
  const typeVars = {};
  for (const [name, def] of Object.entries(type)) {
    typeVars[`type-${toKebabCase(name)}-font-family`] = `'${def.fontFamily}', sans-serif`;
    typeVars[`type-${toKebabCase(name)}-font-weight`] = def.fontWeight;
    typeVars[`type-${toKebabCase(name)}-font-size`] = `${def.fontSizePx}px`;
    typeVars[`type-${toKebabCase(name)}-line-height`] = `${def.lineHeightPx}px`;
    typeVars[`type-${toKebabCase(name)}-letter-spacing`] = `${def.letterSpacingPx}px`;
  }

  const all = { ...colorVars, ...typeVars };

  const lines = [
    "/* This file is generated. Do not edit by hand. */",
    "/* Run: npm run tokens */",
    "",
    ":root {",
    ...Object.entries(all)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => cssVarLine(k, v)),
    "}",
    "",
  ];

  await fs.writeFile(outPath, lines.join("\n"), "utf8");
  // eslint-disable-next-line no-console
  console.log(`Wrote ${path.relative(repoRoot, outPath)}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});

