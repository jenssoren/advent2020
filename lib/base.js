const fs = require('fs').promises;

class Base {
  constructor(filename) {    
    this.filename = filename;
  }

  load_input(filename) {
    return fs.readFile(filename, 'utf8');
  }

  parse_input(data) {
    return data.split("\n");
  }

  handle(file) {
    console.log("HIT HERE");
  }

  async run() {
    this.handle(this.parse_input((await this.load_input(this.filename))));
  }
}

exports.Base = Base;