const Task1 = require('./task1.js');

class Task extends Task1.Task {
  handle(data) {
    data = data.map(input => {
      return {
        row: this.find_middle(input.substring(0, 7).split(""), 128),
        col: this.find_middle(input.substring(7, 10).split(""), 8)
      };
    });

    // The right answer is the row with only one empty col
    for (let i = 0; i < 128; i++) {
      for (let j = 0; j < 8; j++) {
        if (!data.find(seat => seat.row == i && seat.col == j)) {
          console.log("EMPTY SEAT AT ROW: ", i, " COLUMN: ", j, " SEAT ID: ", i * 8 + j);
        }
      }
    }
  }
}

exports.Task = Task;