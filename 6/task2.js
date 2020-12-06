const Task1 = require('./task1.js');

class Task extends Task1.Task {
  find_answers(group) {
    let questions = [],
        answers = [];
    group.forEach(person => {
      const person_answers = person.split("");
      person_answers.forEach(answer => {
        answers.push(answer);
        if (questions.indexOf(answer) == -1) {
          questions.push(answer);
        }
      });
    });


    return questions.filter(question => {
      return answers.filter(x => x == question).length == group.length;
    });
  }
}

exports.Task = Task;