const { Base } = require('../lib/base.js')

class Task extends Base {
  constructor (filename) {
    super(filename)
    this.preambleSize = 25
  }

  parseInput (data) {
    return data
      .split('\n')
      .map(number => parseInt(number))
  }

  handle (data) {
    console.log('Unmatched number: ', this.findInvalidNumber(data))
  }

  findInvalidNumber (data) {
    let invalidNumber = null

    data.slice(this.preambleSize).forEach((number, index) => {
      const previousNumbers = data.slice(
        this.preambleSize + index - this.preambleSize,
        this.preambleSize + index
      )

      const match = previousNumbers.find(x => {
        return previousNumbers.find(y => {
          return x !== y && x + y === number
        })
      })

      if (!match) {
        invalidNumber = number
        return false
      }
    })

    return invalidNumber
  }
}

exports.Task = Task
