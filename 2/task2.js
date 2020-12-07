const Task1 = require('./task1.js')

class Task extends Task1.Task {
  isValid (row) {
    let matches = 0
    if (row.password[row.min - 1] === row.char) {
      matches++
    }

    if (row.password[row.max - 1] === row.char) {
      matches++
    }

    return matches === 1
  }
}

exports.Task = Task
