const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data
      .split('\n')
      .map(number => parseInt(number))
  }

  handle (data) {
    const preambleSize = 25
    data.slice(preambleSize).forEach((number, index) => {
      const previousNumbers = data.slice(
        preambleSize + index - preambleSize,
        preambleSize + index
      )

      const match = previousNumbers.find(x => {
        return previousNumbers.find(y => {
          return x !== y && x + y === number
        })
      })

      if (!match) {
        console.log('Unmatched number: ', number)
      }
    })
  }
}

exports.Task = Task
