const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    const invalidNumber = this.findInvalidNumber(data)
    const chain = this.findChain(data, invalidNumber).sort()
    console.log('First number:', data[0], 'Largest number:', chain[chain.length - 1], 'Added:', chain[0] + chain[chain.length - 1])
  }

  findChain (data, invalidNumber) {
    let sum = 0
    let chain = []
    let correctChain = []
    for (let i = 0; i < data.length; i++) {
      let index = i
      while (sum < invalidNumber) {
        sum += data[index]
        chain.push(data[index])
        index++
      }

      if (sum === invalidNumber && chain.length >= 2) {
        correctChain = chain
      }

      chain = []
      sum = 0
    }

    return correctChain
  }
}

exports.Task = Task
