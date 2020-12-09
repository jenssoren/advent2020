const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    const invalidNumber = this.findInvalidNumber(data)
    const correctChain = this.findCorrectChain(data, invalidNumber)
    const first = correctChain.shift()
    const last = correctChain.pop()
    console.log(
      'First number:',
      first,
      'Largest number:',
      last,
      'Added:',
      first + last
    )
  }

  findCorrectChain (data, invalidNumber) {
    return data
      .map((number, index) => this.findChain(data, invalidNumber, index))
      .find(chain => chain.sum === invalidNumber && chain.chain.length >= 2)
      .chain
      .sort()
  }

  findChain (data, invalidNumber, start) {
    let sum = 0
    const chain = []
    let i = start
    while (sum < invalidNumber) {
      sum += data[i]
      chain.push(data[i])
      i++
    }

    return { chain, sum }
  }
}

exports.Task = Task
