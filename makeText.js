/** Command-line tool to generate Markov text. */
const {MarkovMachine} = require("./markov");
const axios = require('axios');
const fs = require('fs');

const generateText = (text) => {
    const mm = new MarkovMachine(text);
    console.log(mm.makeText());
} 

const generateTextFromFile = async (path) => {
    try{
        const data = await fs.promises.readFile(path,{encoding:'utf8'})
        generateText(data);
    } catch (e){
        console.error(e);
        process.exit(1);
    }
}

const generateTextFromUrl = async (url) => {
    try{
        const res = await axios.get(url);
        console.log("RES: ", res)
        generateText(res.data);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

const args = process.argv;
console.log(args);

if (args[2] === "file"){
    generateTextFromFile(args[3]);
} else if (args[2] === "url"){
    generateTextFromUrl(args[3]);
} else {
    console.error(
        `Flag ${args[2]} is not a valid flag, please use "file" or "url"`
    );
}