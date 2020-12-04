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
    if (validate_keys(data[i])) {
      validPassports++;
    }
  }

  console.log("Valid passports: ", validPassports);
}

function validate_keys(data) {
  const keys = Object.getOwnPropertyNames(data);
  const required_keys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  if (!required_keys.every(val => keys.indexOf(val) !== -1)) {
    return false;
  }

  if (data.byr < 1920 || data.byr > 2002) {
    return false;
  }

  if (data.iyr < 2010 || data.iyr > 2020) {
    return false;
  }

  if (data.eyr < 2020 || data.eyr > 2030) {
    return false;
  }

  // hgt
  let hgt_unit = data.hgt.substr(data.hgt.length - 2);
  let height = parseInt(data.hgt);

  if (data.hgt != height.toString() + hgt_unit) {
    return false;
  }

  if (!(hgt_unit == "cm" || hgt_unit == "in")) {
    return false;
  }

  if (hgt_unit == "cm") {
    if (height < 150 || height > 193) {
      return false;
    }
  }

  if (hgt_unit == "in") {
    if (height < 59 || height > 76) {
      return false;
    }
  }

  // console.log(data.hgt);

  let hclReg = /#[0-9a-f]{6}$/g;
  if (!hclReg.test(data.hcl)) {
    return false;
  }

  if (["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(data.ecl) == -1) {
    return false;
  }

  if (data.pid.toString().length != 9) {
    return false;
  }

  //console.log(data);

  return true;
}