let encoding = 'utf-8';

const stdin = process.stdin;

let sentence = '';

stdin.on('data', (chunk) => {
  const str = chunk.toString(encoding);
  const len = str.length;
  if (!str.trim() && !sentence) {
    console.log('Bye!');
    stdin.destroy();
    return;
  }
  if (str[len - 2] === '\\') {
    sentence += str.substring(0, len - 2);
  } else {
    sentence += str.substring(0, len - 1);
    console.log(sentence.split('').reverse().join(''));
    sentence = '';
    printInviteMessage();
  }
});

printInviteMessage();

function printInviteMessage() {
  console.log('Enter a string to reverse (enter empty string to exit):');
}

