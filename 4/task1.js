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
  let splited = data.split("\n");
  let counter = 0;
  let formatedData = [{}];
  
  for (let i = 0; i < splited.length; i++) {
    if (splited[i] == "") {
      formatedData.push({});
      counter++;
    } else {
      params = splited[i].split(" ");
      for (let j = 0; j < params.length; j++) {
        [key, value] = params[j].split(":", 2);
        formatedData[counter][key] = value;
      }
    }
  }

  return formatedData;
}

function handle(data)
{
  let validPassports = 0;
  for (let i = 0; i < data.length; i++) {
    if (validate_keys(Object.getOwnPropertyNames(data[i]))) {
      validPassports++;
    }
  }

  console.log("Valid passports: ", validPassports);
}

function validate_keys(keys) {
  const required_keys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  return required_keys.every(val => keys.indexOf(val) !== -1);
}