const { Base } = require('../lib/base.js')

class Task extends Base {
  constructor (filename) {
    super(filename)
    this.preambleSize = 25
  }

  parseInput (data) {
    return data.split('\n').map(number => parseInt(number))
  }

  handle (data) {
    console.log('Unmatched number: ', this.findInvalidNumber(data))
  }

  findInvalidNumber (data) {
    return data.slice(this.preambleSize).find((number, index) => {
      const previousNumbers = data.slice(
        this.preambleSize + index - this.preambleSize,
        this.preambleSize + index
      )

      return !previousNumbers.find(x => {
        return previousNumbers.find(y => {
          return x !== y && x + y === number
        })
      })
    })
  }
}

exports.Task = Task
