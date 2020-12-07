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
    const matches = this.find_carriers(data, "shiny gold")
                        .filter((val, ind, coll) => coll.indexOf(val) === ind); //unique filter 
    console.log("Bag can fit into: " + matches.length + " bags");
  }

  find_carriers(data, carrier) {
    let matches = [];
    data.forEach(bag => {
      bag.content
         .filter(sub => sub.color == carrier)
         .forEach(_ => {
            matches.push(bag);
            matches = matches.concat(this.find_carriers(data, bag.color));
         });
    });

    return matches;
  }
}

exports.Task = Task;