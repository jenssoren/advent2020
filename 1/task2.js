const { Base } = require('../lib/base.js')

class Task extends Base {
  pass_input(data) {
    return data.split("\n").map(row => parseInt(row));
  }

  handle(data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        for (let k = 0; k < data.length; k++) {
          if (i != j && i != k && k != j) {
            if (data[i] + data[j] + data[k] == 2020) {
              console.log(data[i] + " x " + data[j] + " x " + data[k] + " = " + data[i] * data[j] * data[k]);
            }
          }
        }
      }
    }
  }
}

exports.Task = Task;

