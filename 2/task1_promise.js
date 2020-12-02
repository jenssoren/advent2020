const { runInContext } = require('vm');

const fs = require('fs').promises;

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const filename = process.argv[2];

async function run() {
  filehandler = await load_input(filename);
  data = handle(pass_input(filehandler));
}

run();

function load_input(filename)
{
  return fs.readFile(filename, 'utf8');
}

function pass_input(data)
{
  let formatedData = data.split("\n");
  
  formatedData = formatedData.map(row => {
    let tmp, min, max, char, password;
    matches = [...row.matchAll(/(\d*)-(\d*) (.): (.+)/g)][0];
    if (matches != undefined) {
      [tmp, min, max, char, password] = matches;
      return { min, max, char, password };
    } else {
      return null;
    }
  });

  formatedData = formatedData.filter(row => row != null);
  return formatedData;
}

function handle(data)
{
  let validPasswordsCounter = 0;
  for (var i = 0; i < data.length; i++) {
    if (isValid(data[i])) {
      validPasswordsCounter++;
    }
  }

  console.log("Valid passwords: " + validPasswordsCounter);
}

function isValid(row)
{
  const charCount = row.password.split(row.char).length - 1;
  return charCount >= row.min && charCount <= row.max;
}