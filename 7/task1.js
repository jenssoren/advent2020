const { Base } = require('../lib/base.js')

class Task extends Base {
  parse_input(data) {
    data = data.split("\n").map(row => {
      let color, content;
      const matches = [...row.matchAll(/^(\w+ \w+) (\w+ \w+) (.+)/g)][0];
      color = matches[1];
      content = matches[3].split(", ").map(bag => {
        if (bag == "no other bags.") {
          return null;
        } else {
          let parts = bag.split(" ");
          return {
            amount: parseInt(parts[0]),
            color: parts[1] + " " + parts[2]
          };
        }
      });
      if (content[0] == null) {
        content = null;
      }

      return {color, content};
    });

    return data.filter(bag => bag.content != null);
  }
  
  handle(data) {
    let matches = [];
    matches = this.find_carriers(data, matches, ["shiny gold"]);
    console.log("Shiny gold bag can fit into: " + matches.length + " bags");
  }

  find_carriers(data, matches, start_carriers) {
    let current_matches = [];
    start_carriers.forEach(carrier => {
      current_matches = current_matches.concat(this.find_carrier(data, carrier));
    });

    if (current_matches.length > 0) {
      current_matches.forEach(match => {
        if (!matches.find(bag => bag.color == match.color)) {
          matches.push(match);
        }
      })
      return this.find_carriers(data, matches, current_matches.map(bag => bag.color));
    }
    
    return matches;
  }

  find_carrier(data, carrier) {
    return data.filter(bag => {
      return bag.content.filter(x => x.color == carrier).length >= 1;
    });
  }
}

exports.Task = Task;