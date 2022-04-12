"use strict";

const fsP = require("fs/promises");
const axios = require("axios");
const path = process.argv[2];


/** Read file path */
async function cat() {
  try {
    let contents = await fsP.readFile(path, "utf8");
    console.log("file contents: ", contents);
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


async function conductor(){
  if(path.includes("http")){
    await webCat();
    process.exit(0)
  }
  await cat()
}

conductor();