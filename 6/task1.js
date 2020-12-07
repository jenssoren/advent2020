const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    const groups = [[]]
    let counter = 0
    data.split('\n').forEach(row => {
      if (row === '') {
        groups.push([])
        counter++
      } else {
        groups[counter].push(row)
      }
    })

    return groups
  }

  handle (data) {
    const questions = data.map(group => this.findAnswers(group))
    const questionsSum = questions.reduce((acc, cur) => acc + cur.length, 0)
    console.log('Sum of answers: ', questionsSum)
  }

  findAnswers (group) {
    const questions = []
    group.forEach(person => {
      const answers = person.split('')
      answers.forEach(answer => {
        if (questions.indexOf(answer) === -1) {
          questions.push(answer)
        }
      })
    })

    return questions
  }
}

exports.Task = Task
