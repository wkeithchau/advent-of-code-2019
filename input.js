import fs from "fs";
import path from "path";

const ROOTPATH = path.dirname(import.meta.url);

const readFile = path => {
  return fs.readFileSync(path, "utf8");
};

export const getInput = absUrl => {
  const relativePath = path.relative(ROOTPATH, absUrl);
  const inputPath = `${path.dirname(relativePath)}/input`;

  const input = readFile(inputPath);
  const lines = input.split("\n");
  return lines;
};
