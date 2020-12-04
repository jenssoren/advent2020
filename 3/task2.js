const { Base } = require('../lib/base.js')

class Task extends Base {
  pass_input(data) {
    return data.split("\n").map(row => row.split(""));
  }

  handle(data) {
    let r1 = this.countHitTrees(data, 1, 1);
    let r3 = this.countHitTrees(data, 3, 1);
    let r5 = this.countHitTrees(data, 5, 1);
    let r7 = this.countHitTrees(data, 7, 1);
    let d2 = this.countHitTrees(data, 1, 2);

    console.log("Hit trees: ", r1 * r3 * r5 * r7 * d2);
  }

  countHitTrees(data, colSize, down) {
    let hitTrees = 0;
    let col = 0;
    for (var i = down; i < data.length; i = i + down) {
      col = col + colSize;
      if (col > data[i].length - 1) {
        col = col - data[i].length;
      }

      if (data[i][col] == "#") {
        hitTrees++;
      }
    }

    return hitTrees;
  }
}

exports.Task = Task;