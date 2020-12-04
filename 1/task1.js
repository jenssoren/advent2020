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
  return data.split("\n").map(row => parseInt(row));
}

function handle(data)
{
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (i != j) {
        if (data[i] + data[j] == 2020) {
          console.log(data[i] + " x " + data[j] + " = " + data[i] * data[j]);
        }
      }
    }
  }
}