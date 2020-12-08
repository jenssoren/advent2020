const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data
      .split('\n')
      .map(row => {
        const parts = [...row.matchAll(/^(\w+) ([\\+-].*)/g)][0]
        return {
          instruction: parts[1],
          argument: parseInt(parts[2])
        }
      })
  }

  handle (data) {
    console.log('Accumulator is: ', this.runner(data).accumulator)
  }

  runner (data) {
    let accumulator = 0
    const instructionsVisited = []
    let line = 0
    while (instructionsVisited.indexOf(line) === -1 && data.length > line) {
      instructionsVisited.push(line)
      const result = this.processLine(data[line], line)
      accumulator += result.accumulator
      line = result.next
    }

    return {
      exitCode: data.length <= line ? 0 : 1,
      accumulator: accumulator
    }
  }

  processLine (instruction, line) {
    let accumulator
    switch (instruction.instruction) {
      case 'nop':
        line++
        accumulator = 0
        break
      case 'acc':
        line++
        accumulator = instruction.argument
        break
      case 'jmp':
        line += instruction.argument
        accumulator = 0
        break
    }

    return { next: line, accumulator }
  }
}

exports.Task = Task
