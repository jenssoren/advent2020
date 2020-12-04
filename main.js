if (process.argv.length < 5) {
  console.log('Usage: node ' + process.argv[1] + ' DAY ' + 'TASK FILENAME');
  process.exit(1);
}

const day = process.argv[2],
      task = process.argv[3],
      filename = process.argv[4];

const { Task } = require("./" + day + "/task" + task + ".js");

(new Task(filename)).run();
