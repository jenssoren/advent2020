const Task1 = require('./task1.js')

class Task extends Task1.Task {
  constructor (filename) {
    super(filename)
    this.occupiedSeats = 5
  }

  findOccupied (data, row, seat) {
    let occupied = 0

    // UP LEFT
    if (this.findUpLeft(data, row, seat) === '#') {
      occupied++
    }

    // UP UP
    if (this.findUp(data, row, seat) === '#') {
      occupied++
    }

    // UP RIGHT
    if (this.findUpRight(data, row, seat) === '#') {
      occupied++
    }

    // RIGHT
    if (this.findRight(data, row, seat) === '#') {
      occupied++
    }

    // LEFT
    if (this.findLeft(data, row, seat) === '#') {
      occupied++
    }

    // DOWN LEFT
    if (this.findDownLeft(data, row, seat) === '#') {
      occupied++
    }

    // DOWN DOWN
    if (this.findDown(data, row, seat) === '#') {
      occupied++
    }

    // DOWN RIGHT
    if (this.findDownRight(data, row, seat) === '#') {
      occupied++
    }

    return occupied
  }

  findUpLeft (data, row, seat) {
    let foundSeat = false
    if (row === 0 || seat === 0) {
      return false
    }

    row--
    seat--

    while (row >= 0 && seat >= 0 && !foundSeat) {
      const seatChar = data[row][seat]
      if (seatChar !== '.') {
        foundSeat = seatChar
      }

      row--
      seat--
    }

    return foundSeat
  }

  findUp (data, row, seat) {
    let foundSeat = false
    if (row === 0) {
      return false
    }

    row--

    while (row >= 0 && !foundSeat) {
      const seatChar = data[row][seat]
      if (seatChar !== '.') {
        foundSeat = seatChar
      }

      row--
    }

    return foundSeat
  }

  findUpRight (data, row, seat) {
    let foundSeat = false
    if (row === 0 || seat === data[row].length - 1) {
      return false
    }

    row--
    seat++

    while (row >= 0 && seat <= data[row].length && !foundSeat) {
      const seatChar = data[row][seat]
      if (seatChar !== '.') {
        foundSeat = seatChar
      }

      row--
      seat++
    }

    return foundSeat
  }

  findLeft (data, row, seat) {
    let foundSeat = false
    if (seat === 0) {
      return false
    }

    seat--

    while (seat >= 0 && !foundSeat) {
      const seatChar = data[row][seat]
      if (seatChar !== '.') {
        foundSeat = seatChar
      }

      seat--
    }

    return foundSeat
  }

  findRight (data, row, seat) {
    let foundSeat = false
    if (seat === data[row].length - 1) {
      return false
    }

    seat++

    while (seat < data.length && !foundSeat) {
      const seatChar = data[row][seat]

      if (seatChar !== '.') {
        foundSeat = seatChar
      }

      seat++
    }

    return foundSeat
  }

  findDownLeft (data, row, seat) {
    let foundSeat = false
    if (row === data.length - 1 || seat === 0) {
      return false
    }

    row++
    seat--

    while (row < data.length && seat >= 0 && !foundSeat) {
      const seatChar = data[row][seat]
      if (seatChar !== '.') {
        foundSeat = seatChar
      }

      row++
      seat--
    }

    return foundSeat
  }

  findDown (data, row, seat) {
    let foundSeat = false
    if (row === data.length - 1) {
      return false
    }

    row++

    while (row < data.length && !foundSeat) {
      const seatChar = data[row][seat]
      if (seatChar !== '.') {
        foundSeat = seatChar
      }

      row++
    }

    return foundSeat
  }

  findDownRight (data, row, seat) {
    let foundSeat = false
    if (row === data.length - 1 || seat === data[row].length - 1) {
      return false
    }

    row++
    seat++

    while (row < data.length && seat < data[row].length && !foundSeat) {
      const seatChar = data[row][seat]
      if (seatChar !== '.') {
        foundSeat = seatChar
      }

      row++
      seat++
    }

    return foundSeat
  }
}

exports.Task = Task
