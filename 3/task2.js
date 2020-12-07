const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    const r1 = this.countHitTrees(data, 1, 1)
    const r3 = this.countHitTrees(data, 3, 1)
    const r5 = this.countHitTrees(data, 5, 1)
    const r7 = this.countHitTrees(data, 7, 1)
    const d2 = this.countHitTrees(data, 1, 2)

    console.log('Hit trees: ', r1 * r3 * r5 * r7 * d2)
  }

  countHitTrees (data, colSize, down) {
    let hitTrees = 0
    let col = 0
    for (let i = down; i < data.length; i = i + down) {
      col = col + colSize
      if (col > data[i].length - 1) {
        col = col - data[i].length
      }

      if (data[i][col] === '#') {
        hitTrees++
      }
    }

    return hitTrees
  }
}

exports.Task = Task
