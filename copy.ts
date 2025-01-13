#!/usr/bin/env node

import * as fs from "fs/promises";
import * as path from "path";
import { existsSync } from "fs";
import parseGitignore from "ignore";
import { program } from "commander";

interface CopyOptions {
  sourcePath: string;
}

async function readGitignore(dirPath: string): Promise<string[]> {
  const gitignorePath = path.join(dirPath, ".gitignore");

  try {
    const content = await fs.readFile(gitignorePath, "utf-8");
    return content
      .split("\n")
      .filter((line) => line.trim() && !line.startsWith("#"));
  } catch (error) {
    return [];
  }
}

async function shouldIgnore(
  filePath: string,
  ignorePatterns: string[],
): Promise<boolean> {
  if (ignorePatterns.length === 0) return false;

  const ignore = parseGitignore();
  ignorePatterns.forEach((pattern) => ignore.add(pattern));

  return ignore.ignores(filePath);
}

async function copyDirectory(
  source: string,
  destination: string,
  ignorePatterns: string[],
) {
  try {
    const entries = await fs.readdir(source, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(source, entry.name);
      const destPath = path.join(destination, entry.name);
      const relativePath = path.relative(source, sourcePath);

      // Skip .git directory
      if (entry.name === ".git") {
        console.log("Skipping .git directory");
        continue;
      }

      // Skip package.json
      if (entry.name === "package.json") {
        console.log("Skipping package.json");
        continue;
      }

      // Skip yarn.lock
      if (entry.name === "yarn.lock") {
        console.log("Skipping yarn.lock");
        continue;
      }

      if (await shouldIgnore(relativePath, ignorePatterns)) {
        console.log(`Skipping ignored path: ${relativePath}`);
        continue;
      }

      if (entry.isDirectory()) {
        if (!existsSync(destPath)) {
          await fs.mkdir(destPath, { recursive: true });
        }
        await copyDirectory(sourcePath, destPath, ignorePatterns);
      } else {
        try {
          await fs.copyFile(sourcePath, destPath);
          console.log(`Copied: ${relativePath}`);
        } catch (error) {
          console.error(`Error copying ${relativePath}: ${error}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory: ${error}`);
    process.exit(1);
  }
}

async function main() {
  program
    .description("Copy directory contents while respecting .gitignore")
    .argument("<source>", "Source directory path")
    .parse(process.argv);

  const options: CopyOptions = {
    sourcePath: program.args[0],
  };

  if (!existsSync(options.sourcePath)) {
    console.error("Error: Source directory does not exist");
    process.exit(1);
  }

  const sourceDir = path.resolve(options.sourcePath);
  const currentDir = process.cwd();

  const ignorePatterns = await readGitignore(sourceDir);

  console.log(`Copying from ${sourceDir} to ${currentDir}`);
  console.log(`Found ${ignorePatterns.length} ignore patterns`);

  try {
    await copyDirectory(sourceDir, currentDir, ignorePatterns);
    console.log("Copy completed successfully");
  } catch (error) {
    console.error("Copy failed:", error);
    process.exit(1);
  }
}

main();
