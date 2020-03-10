import fs from "fs";
import path from "path";

const readFile = path => {
  return fs.readFileSync(path, "utf8");
};

export const getInput = absUrl => {
  const rootPath =
    "file:///Users/Keith/GitHub/ninefivetwo/advent-of-code-2019/";
  const relativePath = path.relative(rootPath, absUrl);
  const inputPath = `${path.dirname(relativePath)}/input`;

  const input = readFile(inputPath);
  const lines = input.split("\n");
  return lines;
};
