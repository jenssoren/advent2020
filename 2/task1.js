const { Base } = require('../lib/base.js')

class Task extends Base {
  parse_input(data) {
    return data.split("\n").map(row => {
      let tmp, min, max, char, password;
      const matches = [...row.matchAll(/(\d*)-(\d*) (.): (.+)/g)][0];
      [tmp, min, max, char, password] = matches;
      return { min, max, char, password };
    });
  }

  handle(data) {
    const validPasswords = data.filter(row => this.isValid(row));        
    console.log("Valid passwords: " + validPasswords.length);
  }

  isValid(row) {
    const charCount = row.password.split(row.char).length - 1;
    return charCount >= row.min && charCount <= row.max;
  }
}

exports.Task = Task;