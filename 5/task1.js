const { Base } = require('../lib/base.js')

class Task extends Base {
  handle(data) {
    console.log(data);
    data = data.map(input => {
      let row = this.find_middle(input.substring(0, 7).split(""), 128);
      let col = this.find_middle(input.substring(7, 10).split(""), 8);
      console.log("ROW: ", row, " COLUMN: ", col);

      return row * 8 + col;
    });

    console.log(Math.max(...data));
  }

  find_middle(data, counter) {
    let min = 0,
        max = counter - 1;

    data.forEach(point => {
      counter = counter / 2;
      switch(point) {
        case "F":
        case "L":
          max = max - counter;
          break;
        case "B":
        case "R":
          min = min + counter;
          break;
      }
    });
    return min;
  }
}

exports.Task = Task;