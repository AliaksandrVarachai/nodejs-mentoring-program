import { Duplex } from 'stream';

export default class Reverser extends Duplex {
  constructor(options) {
    super(options);
  }

  _read(size) {
    console.log('Enter a new string (empty string to exit, multiline string ends with "\\"):')
  }

  _write(chunk, encoding, next) {
    const str = chunk.toString();
    this.push(str.split('').reverse().join(''));
    next();
  }
};
