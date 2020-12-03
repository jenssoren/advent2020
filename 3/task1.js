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
  
  return formatedData.map(row => row.split(""));
}

function handle(data)
{
  let hitTrees = 0;
  let col = 0;
  for (var i = 1; i < data.length; i++) {
    col = col + 3;
    if (col > data[i].length - 1) {
      col =  col - data[i].length;
    }

    console.log(i, col);

    if (data[i][col] == "#") {
      hitTrees++;
    }
  }

  console.log("Hit trees: ", hitTrees);
}