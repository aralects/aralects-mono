const { Project } = require("ts-morph");
const fs = require("fs");
const path = require("path");
const minimist = require("minimist");

// Parse command-line arguments
const args = minimist(process.argv.slice(2));

let inputDirs = args.input;
const outputFile = args.output || "index.ts";

if (!inputDirs) {
  console.error("Error: At least one --input directory must be specified.");
  process.exit(1);
}

// Ensure inputDirs is an array
if (!Array.isArray(inputDirs)) {
  inputDirs = [inputDirs];
}

const project = new Project();

// Add source files from input directories
inputDirs.forEach((inputDir) => {
  project.addSourceFilesAtPaths(`${inputDir}/**/*.{ts,tsx}`);
});

const sourceFiles = project.getSourceFiles();

let exportStatements = "";

sourceFiles.forEach((sourceFile) => {
  const exports = sourceFile.getExportSymbols();

  if (exports.length > 0) {
    const filePath = sourceFile.getFilePath();
    let relativePath = path
      .relative(path.dirname(outputFile), filePath)
      .replace(/\.tsx?$/, "");
    relativePath = "./" + relativePath.replace(/\\/g, "/"); // Normalize path

    const namedExports = exports.map((e) => {
      const name = e.getName();
      const declarations = e.getDeclarations();
      if (declarations.length > 0) {
        const declaration = declarations[0];
        const kindName = declaration.getKindName();

        // Check if the export is a type (interface or type alias)
        if (
          kindName === "TypeAliasDeclaration" ||
          kindName === "InterfaceDeclaration"
        ) {
          return `type ${name}`;
        }
      }
      return name;
    });

    // Sort exports: types first, then others
    namedExports.sort((a, b) => {
      const isTypeA = a.startsWith("type ");
      const isTypeB = b.startsWith("type ");
      if (isTypeA && !isTypeB) return -1;
      if (!isTypeA && isTypeB) return 1;
      return 0;
    });

    exportStatements += `export { ${namedExports.join(", ")} } from '${relativePath}';\n`;
  }
});

fs.writeFileSync(outputFile, exportStatements);
console.log(`Index file for exporting UI library generated at ${outputFile}`);
