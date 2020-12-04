const { Base } = require('../lib/base.js')

class Task extends Base {
  pass_input(data) {
    return data.split("\n").map(row => parseInt(row));
  }

  handle(data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (i != j) {
          if (data[i] + data[j] == 2020) {
            console.log(data[i] + " x " + data[j] + " = " + data[i] * data[j]);
          }
        }
      }
    }
  }
}

exports.Task = Task;