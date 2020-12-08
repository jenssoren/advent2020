const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data
      .split('\n')
      .map(row => {
        const parts = [...row.matchAll(/^(\w+) ([\\+-].*)/g)][0]
        return {
          instuction: parts[1],
          argument: parseInt(parts[2])
        }
      })
  }

  handle (data) {
    let accumulator = 0
    const instructionsVisited = []
    let index = 0
    let running = true
    while (running) {
      if (instructionsVisited.indexOf(index) === -1) {
        instructionsVisited.push(index)
        const result = this.processLine(data[index], index)
        accumulator += result.accumulator
        index = result.index
      } else {
        running = false
      }
    }

    console.log('Accumulator is: ', accumulator)
  }

  processLine (line, index) {
    let accumulator
    switch (line.instuction) {
      case 'nop':
        index++
        accumulator = 0
        break
      case 'acc':
        index++
        accumulator = line.argument
        break
      case 'jmp':
        index += line.argument
        accumulator = 0
        break
    }

    return { index, accumulator }
  }
}

exports.Task = Task
