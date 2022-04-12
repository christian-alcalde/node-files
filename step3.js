"use strict";

const fsP = require("fs/promises");
const axios = require("axios");

let path = process.argv[2];
let outputFile = null;

/** Read file path */
async function cat() {
  try {
    let content = await fsP.readFile(path, "utf8");
    console.log("file contents: ", content);
  } catch (err) {
    console.log("Error reading", path);
    console.log(err);
    process.exit(1);
  }
}

/** Read URL path */
async function webCat() {
  try {
    let content = await axios.get(path);
    console.log("URL contents: ", content.data);
  } catch (err) {
    console.log("Error fetching", path);
    console.log(err);
    process.exit(1);
  }
}

/** Output */
async function output(){
  try {
    if (path.includes("http")){
      let content = await axios.get(path);
      await fsP.writeFile("./output.txt", content.data, "utf8");
      process.exit(0);
    }
    let content = await fsP.readFile(path, "utf8");
    await fsP.writeFile("./output.txt", content, "utf8");
  } catch (err) {
    console.log("Error writing to", "output.txt");
    console.log(err);
    process.exit(1);
  }
}



async function conductor(){
  // console.log("process.argv..",process.argv)
  if(process.argv[3]){
    path = process.argv[4];
    outputFile = process.argv[3];
    await output();
    process.exit(0);
  }

  else if (path.includes("http")){
    await webCat();
    process.exit(0)
  }
  await cat()
}

conductor();