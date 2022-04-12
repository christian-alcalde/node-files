"use strict";

const fsP = require("fs/promises");
const path = process.argv;

async function cat() {
  try {
    let contents = await fsP.readFile(path[2], "utf8");
    console.log("file contents: ", contents);
  } catch (err) {
    console.log("Error reading", path[2]);
    console.log(err);
    process.exit(1);
  }
}

cat();
