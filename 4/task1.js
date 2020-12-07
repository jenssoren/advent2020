const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    const splited = data.split('\n')
    let counter = 0
    const formatedData = [{}]

    splited.forEach(row => {
      if (row === '') {
        formatedData.push({})
        counter++
      } else {
        row.split(' ').forEach(param => {
          const [key, value] = param.split(':', 2)
          formatedData[counter][key] = value
        })
      }
    })

    return formatedData
  }

  handle (data) {
    const validPassports = data.filter(passport => this.validate(passport))
    console.log('Valid passports: ', validPassports.length)
  }

  validate (data) {
    const keys = Object.getOwnPropertyNames(data)
    const requiredKeys = this.requiredKeys()
    return requiredKeys.every(val => keys.indexOf(val) !== -1)
  }

  requiredKeys () {
    return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  }
}

exports.Task = Task
