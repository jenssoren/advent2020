const Task1 = require('./task1.js')

class Task extends Task1.Task {
  findAnswers (group) {
    const questions = []
    const answers = []
    group.forEach(person => {
      const personAnswers = person.split('')
      personAnswers.forEach(answer => {
        answers.push(answer)
        if (questions.indexOf(answer) === -1) {
          questions.push(answer)
        }
      })
    })

    return questions.filter(question => {
      return answers.filter(x => x === question).length === group.length
    })
  }
}

exports.Task = Task
