// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
// Read the file and print its contents.
const fs = require('fs');
const filename = process.argv[2];

load_input(filename);

function load_input(filename)
{
  return fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ' + filename);
    pass_input(data);
  });
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
  handle(formatedData);
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