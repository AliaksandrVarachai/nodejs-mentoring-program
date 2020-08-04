import fs from 'fs';
import path from 'path';
import readline from 'readline';
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

  const parser = csvToJson().fromFile(csvPath);
  const output = fs.createWriteStream(txtPath, { flags: 'w' });

  parser.on('data', (buf) => {
    const source = JSON.parse(buf.toString());
    const target = Object.keys(source).reduce((acc, key) => {
      acc[key.toLowerCase()] = getJsonTypeValue(source[key]);
      return acc;
    }, {});
    output.write(JSON.stringify(target) + '\n');
  });

  parser.on('done', (error) => {
    if (error) {
      console.log(error.message);
      console.log('Execution is interrupted.');
      return;
    }
    if (output.writable) {
      console.log(`Text file is successfully created: ${txtPath}`);
      output.end();
    }
  });

  output.on('error', (error) => {
    console.log(error.message);
    console.log('Execution is interrupted.');
    parser.end();
    output.end();
  });
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
