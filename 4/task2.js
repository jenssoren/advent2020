const { Base } = require('../lib/base.js')

class Task extends Base {
  pass_input(data) {
    let splited = data.split("\n");
    let counter = 0;
    let formatedData = [{}];
    
    splited.forEach(row => {
      if (row == "") {
        formatedData.push({});
        counter++;
      } else {
        row.split(" ").forEach(param => {
          let key, value;
          [key, value] = param.split(":", 2);
          formatedData[counter][key] = value;
        })
      }
    })

    return formatedData;
  }

  handle(data) {
    const validPassports = data.filter(passport => this.validate(passport));
    console.log("Valid passports: ", validPassports.length);
  }
  
  // NOTE TO SELF: THIS IS A TERRIBLE WAY TO VALIDATE!
  // This method returns fails if the validator matches a value OUTSIDE the valid values OR true if no validator fails.
  // This should be reversed so it only returns true if all validators have values INSIDE the valid values.
  // Ex. I wrote data.iyr as data.iry. data.iry is undefined and therefore never gt 2020
  // But I don't want to use time on rewriting this as this is just for fun and it returns the correct amount of valid passports.
  validate(data) {
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

    return true;
  }
}

exports.Task = Task;