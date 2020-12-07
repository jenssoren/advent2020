const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    const result = this.findCarrier(data, 'shiny gold')
    console.log('You need: ' + (result - 1).toString() + ' bags')
  }

  findCarrier (data, carrier) {
    let counter = 1
    const bag = data.find(bag => bag.color === carrier)
    if (bag) {
      bag.content.forEach(bag => {
        counter = counter + bag.amount * this.findCarrier(data, bag.color)
      })
    }

    return counter
  }
}

exports.Task = Task
