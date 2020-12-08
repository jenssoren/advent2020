const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    data.forEach((line, index) => {
      if (line.instruction === 'acc') {
        return true
      }
      const instructions = JSON.parse(JSON.stringify(data))

      instructions[index].instruction = line.instruction === 'nop' ? 'jmp' : 'nop'
      const result = this.runner(instructions)
      if (result.exitCode === 0) {
        console.log('Accumulator is: ', result.accumulator)
      }
    })
  }
}

exports.Task = Task
