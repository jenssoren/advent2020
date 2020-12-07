const { Base } = require('../lib/base.js')

class Task extends Base {
  handle (data) {
    data = data.map(input => {
      const row = this.findMiddle(input.substring(0, 7).split(''), 128)
      const col = this.findMiddle(input.substring(7, 10).split(''), 8)

      return row * 8 + col
    })

    console.log('Heights Seat ID is: ', Math.max(...data))
  }

  findMiddle (data, counter) {
    let min = 0
    let max = counter - 1

    data.forEach(point => {
      counter = counter / 2
      switch (point) {
        case 'F':
        case 'L':
          max = max - counter
          break
        case 'B':
        case 'R':
          min = min + counter
          break
      }
    })
    return min
  }
}

exports.Task = Task
