import { Transform } from 'stream';
import Reverser from './Reverser.js';

const reverser = new Reverser();

let savedLines = '';

const lineTrimmer = new Transform({
  transform(buf, encoding, next) {
    const str = buf.toString().trim();
    const len = str.length;

    // exit on empty sting
    if (!savedLines && !str) {
      console.log('Bye!');
      process.stdin.destroy();
      return next();
    }

    // multiple lines must end with a single "\"
    let i = len - 1;
    while (i > -1) {
      if (str[i] !== '\\') { break; }
      --i;
    }
    if ((len - 1 - i) % 2) {
      savedLines += str.substring(0, len - 1);
      return next();
    }

    // piping (multiline) string
    this.push(savedLines + str);
    savedLines = '';
    return next();
  }
});

const lineFormatter = new Transform({
  transform(buf, encoding, next) {
    this.push(buf.toString() + '\n');
    next();
  }
});

process.stdin
  .pipe(lineTrimmer)
  .pipe(reverser)
  .pipe(lineFormatter)
  .pipe(process.stdout);
