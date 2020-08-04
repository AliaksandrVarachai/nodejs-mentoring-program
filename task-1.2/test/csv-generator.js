import path from 'path';
import fs from 'fs';
import readline from 'readline';
import { promisify } from 'util';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question[promisify.custom] = text => new Promise(resolve => {
  rl.question(text, answer => resolve(answer));
});

const questionAsync = promisify(rl.question);

const dirPath = 'csv';
const startCode = 'a'.charCodeAt();
const endCode = 'z'.charCodeAt();
let filename = 'test.csv';
let cols = 4;
let rows = 20;
let wordLength = 10;
let fileWriter = null;

questionAsync(`Enter file name (${filename}): `)
  .then(line => {
    filename = line.trim() || filename;
    return questionAsync(`Enter column number (${cols}): `);
  })
  .then(line => {
    cols = parseInt(line, 10) || cols;
    return questionAsync(`Enter row number (${rows}): `);
  })
  .then(line => {
    rows = parseInt(line, 10) || rows;
    return questionAsync(`enter word length (${wordLength} chars): `);
  })
  .then(line => {
    wordLength = parseInt(line, 10) || wordLength;
  })
  .then(() => {
    const filePath = path.resolve(path.dirname('.'), dirPath, filename);
    fileWriter = fs.createWriteStream(filePath, {
      flags: 'wx'
    });
    return new Promise((resolve, reject) => {
      fileWriter.on('error', (error) => {
        console.log(`File ${filePath} already exists or writing is forbidden.`);
        reject(Error('File creation is interrupted.'));
      });
      fileWriter.on('ready', () => {
        resolve(null);
      });
    });
  })
  .then(() => {
    fileWriter.write(generateHeader(cols));
    const wordLengths = new Array(cols).fill(wordLength);
    for (let i = 0; i < rows; ++i) {
      fileWriter.write('\n' + generateLine(wordLengths), (err) => {
        if (err) { throw err; }
      });
    }
    console.log(`File successfully created: ${fileWriter.path}`);
  })
  .catch(error => {
    console.log(error.message);
  })
  .finally(() => {
    fileWriter.close();
    rl.close();
  });


function generateHeader(cols) {
  let line = 'h0';
  for (let i = 1; i < cols; ++i) {
    line += `,h${i}`;
  }
  return line;
}

function generateLine(wordLengths) {
  return wordLengths.map(len => generateWord(len)).join(',');
}

function generateWord(len) {
  const code = startCode + Math.trunc(Math.random() * (endCode + 1 - startCode));
  return String.fromCharCode(code).repeat(len);
}
