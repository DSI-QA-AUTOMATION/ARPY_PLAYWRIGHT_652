import fs from "fs";
import path from "path";

export function loadTestData(fileName) {

  const filePath = path.resolve(
    process.cwd(),
    "test-data",
    fileName
  );

  const data = fs.readFileSync(
    filePath,
    "utf-8"
  );

  return JSON.parse(data);
}