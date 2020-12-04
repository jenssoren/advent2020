const { Base } = require('../lib/base.js')

class Task extends Base {
  pass_input(data) {
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
    let matches = 0;
    if (row.password[row.min - 1] == row.char) {
      matches++;
    } 

    if (row.password[row.max - 1] == row.char) {
      matches++;
    }

    return matches == 1;
  }
}

exports.Task = Task;