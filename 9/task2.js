const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    const invalidNumber = this.findInvalidNumber(data)
    const chains = this.findChains(data, invalidNumber)
    const correctChain = this.findCorrectChain(chains, invalidNumber).sort()
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
      .find(chain => chain.sum === invalidNumber && chain.chain.length >= 2)
      .chain
  }

  findChains (data, invalidNumber) {
    return data.map((_, index) => this.findChain(data, invalidNumber, index))
  }

  findChain (data, invalidNumber, index) {
    let sum = 0
    const chain = []
    while (sum < invalidNumber) {
      sum += data[index]
      chain.push(data[index])
      index++
    }

    return { chain, sum }
  }
}

exports.Task = Task
