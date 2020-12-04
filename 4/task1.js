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
    const validPassports = data.filter(passport => this.validate(passport))
    console.log("Valid passports: ", validPassports.length);
  }
  
  validate(data) {
    const keys = Object.getOwnPropertyNames(data);
    const required_keys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    return required_keys.every(val => keys.indexOf(val) !== -1);
  }
}

exports.Task = Task;