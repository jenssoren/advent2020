const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split('\n').map(row => row.split(''))
  }

  handle (data) {
    let hitTrees = 0
    let col = 0
    for (let i = 1; i < data.length; i++) {
      col = col + 3
      if (col > data[i].length - 1) {
        col = col - data[i].length
      }

      if (data[i][col] === '#') {
        hitTrees++
      }
    }

    console.log('Hit trees: ', hitTrees)
  }
}

exports.Task = Task
