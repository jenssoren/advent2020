const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split('\n').map(row => row.split(''))
  }

  handle (data) {
    let prevPlan = this.simulate(data)
    let currentPlan = this.simulate(prevPlan)

    while (this.planToString(currentPlan) !== this.planToString(prevPlan)) {
      prevPlan = currentPlan
      currentPlan = this.simulate(currentPlan)
    }

    console.log('Occupied seats:', this.planToString(currentPlan).split('#').length - 1)
  }

  simulate (data) {
    const plan = JSON.parse(JSON.stringify(data))
    return plan.map((row, rowIndex) => row.map((seat, seatIndex) => this.simulateSeat(data, rowIndex, seatIndex)))
  }

  simulateSeat (data, row, seat) {
    let char = data[row][seat]
    switch (char) {
      case 'L':
        if (this.findOccupied(data, row, seat) === 0) {
          char = '#'
        }
        break
      case '#':
        if (this.findOccupied(data, row, seat) >= 4) {
          char = 'L'
        }
    }
    return char
  }

  findOccupied (data, row, seat) {
    let occupied = 0
    // UP
    if (row !== 0) {
      if (seat !== 0 && data[row - 1][seat - 1] === '#') {
        occupied++
      }
      if (data[row - 1][seat] === '#') {
        occupied++
      }
      if (seat !== data[row].length - 1 && data[row - 1][seat + 1] === '#') {
        occupied++
      }
    }
    // LEFT
    if (seat !== 0 && data[row][seat - 1] === '#') {
      occupied++
    }
    // RIGHT
    if (seat !== data[row] && data[row][seat + 1] === '#') {
      occupied++
    }

    // DOWN
    if (row !== data.length - 1) {
      if (seat !== 0 && data[row + 1][seat - 1] === '#') {
        occupied++
      }
      if (data[row + 1][seat] === '#') {
        occupied++
      }
      if (seat !== data.length - 1 && data[row + 1][seat + 1] === '#') {
        occupied++
      }
    }

    return occupied
  }

  planToString (data) {
    return data.map(row => row.join('')).join('')
  }

  print (data) {
    data.forEach(row => console.log(row.join('')))
  }
}

exports.Task = Task
