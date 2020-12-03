const { count } = require('console');

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
  let r1 = countHitTrees(data, 1, 1);
  let r3 = countHitTrees(data, 3, 1);
  let r5 = countHitTrees(data, 5, 1);
  let r7 = countHitTrees(data, 7, 1);
  let d2 = countHitTrees(data, 1, 2);

  console.log("Hit trees: ", r1 * r3 * r5 * r7 * d2);
}

function countHitTrees(data, colSize, down)
{
  let hitTrees = 0;
  let col = 0;
  for (var i = down; i < data.length; i = i + down) {
    col = col + colSize;
    if (col > data[i].length - 1) {
      col = col - data[i].length;
    }

    console.log(i, col);

    if (data[i][col] == "#") {
      hitTrees++;
    }
  }

  console.log("Hit trees(D:" + down + " R: " + colSize +")", hitTrees);
  return hitTrees;
}