const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split('\n').map(row => {
      // eslint-disable-next-line no-unused-vars
      const [_tmp, min, max, char, password] = [...row.matchAll(/(\d*)-(\d*) (.): (.+)/g)][0]
      return { min, max, char, password }
    })
  }

  handle (data) {
    const validPasswords = data.filter(row => this.isValid(row))
    console.log('Valid passwords: ' + validPasswords.length)
  }

  isValid (row) {
    const charCount = row.password.split(row.char).length - 1
    return charCount >= row.min && charCount <= row.max
  }
}

exports.Task = Task
