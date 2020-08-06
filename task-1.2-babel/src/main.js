import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { Transform, pipeline } from 'stream';
import csvToJson from 'csvtojson';

const rl = readline.createInterface(process.stdin, process.stdout);

const ask = (question) => new Promise((resolve) => {
  rl.question(question, answer => resolve(answer));
});

const dirname = 'csv';
let csvFilename = 'nodejs-hw1-ex2.csv';
let txtFilename = null;

main();

async function main() {
  const filename = await ask(`Enter file name from "${dirname}" folder (${csvFilename}): `);
  rl.close();
  csvFilename = filename.trim() || csvFilename;
  if (!path.extname(csvFilename)) {
    csvFilename += '.csv';
  }
  txtFilename = path.basename(csvFilename).split(/\.[^.]*$/)[0] + '.txt';
  const csvPath = path.resolve(path.dirname('.'), dirname, csvFilename);
  const txtPath = path.resolve(path.dirname('.'), dirname, txtFilename);

  const readCsvStream = fs.createReadStream(csvPath, { highWaterMark: 64 });
  const parser = csvToJson();
  const transform = new Transform({
    transform(buf, encoding, next) {
      const source = JSON.parse(buf.toString());
      const ignoredKeys = new Set(['Amount']);
      const target = Object.keys(source).reduce((acc, key) => {
        if (!ignoredKeys.has(key)) {
          acc[key.toLowerCase()] = getJsonTypeValue(source[key]);
        }
        return acc;
      }, {});
      this.push(JSON.stringify(target) + '\n');
      next();
    }
  });
  const writeTxtStream = fs.createWriteStream(txtPath, { flags: 'w' });

  pipeline(
    readCsvStream,
    parser,
    transform,
    writeTxtStream,
    (error) => {
      if (error) {
        return errorHandler(error, txtPath);
      }
      console.log(`File ${txtFilename} has been written successfully.`)
    }
  );
}

function getJsonTypeValue(strValue) {
  if (strValue === 'null') {
    return null;
  }
  if (!isNaN(strValue)) {
    return +strValue;
  }
  return strValue;
}

function errorHandler(error, txtPath) {
  fs.unlink(txtPath, (err) => {
    if (err) {
      console.log(`Failed to remove ${txtPath} file. Remove it manually.`);
    }
  });
  console.log(`Error ${error.message}.\nExecution is interrupted.`);
}
