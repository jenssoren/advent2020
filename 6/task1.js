const { Base } = require('../lib/base.js')

class Task extends Base {
  parse_input(data) {
    let groups = [[]],
        counter = 0;
    data.split("\n").forEach(row => {
      if (row == "") {
        groups.push([]);
        counter++
      } else {
        groups[counter].push(row);
      }
    });

    return groups;
  }
  
  handle(data) {
    const questions = data.map(group => this.find_answers(group));
    let questions_sum = 0;
    questions.forEach(question => questions_sum = questions_sum + question.length);
    console.log("Sum of answers: ", questions_sum);
  }

  find_answers(group) {
    let questions = [];
    group.forEach(person => {
      const answers = person.split("");
      answers.forEach(answer => {
        if (questions.indexOf(answer) == -1) {
          questions.push(answer);
        }
      });
    });

    return questions;
  }
}

exports.Task = Task;