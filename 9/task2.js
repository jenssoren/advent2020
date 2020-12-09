const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    const invalidNumber = this.findInvalidNumber(data)
    const chain = this.findCorrectChain(data, invalidNumber).sort()
    console.log(
      'First number:',
      data[0],
      'Largest number:',
      chain[chain.length - 1],
      'Added:',
      chain[0] + chain[chain.length - 1]
    )
  }

  findCorrectChain (data, invalidNumber) {
    let correctChain = []

    data.forEach((number, index) => {
      const chain = this.findChain(data, invalidNumber, index)

      if (chain.sum === invalidNumber && chain.chain.length >= 2) {
        correctChain = chain.chain
        return false
      }
    })

    return correctChain
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
