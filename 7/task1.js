const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data
      .split('\n')
      .map(row => {
        let content
        const matches = [...row.matchAll(/^(\w+ \w+) (\w+ \w+) (.+)/g)][0]
        if (matches[3] !== 'no other bags.') {
          content = matches[3].split(', ').map(bag => {
            const parts = bag.split(' ')
            return {
              amount: parseInt(parts[0]),
              color: parts[1] + ' ' + parts[2]
            }
          })
        }

        return { color: matches[1], content: content }
      })
      .filter(bag => bag.content)
  }

  handle (data) {
    const matches = this
      .findCarriers(data, 'shiny gold')
      .filter((val, ind, coll) => coll.indexOf(val) === ind) // unique filter
    console.log('Bag can fit into: ' + matches.length + ' bags')
  }

  findCarriers (data, carrier) {
    let matches = []
    data.forEach(bag => {
      bag.content
        .filter(sub => sub.color === carrier)
        .forEach(_ => {
          matches.push(bag)
          matches = matches.concat(this.findCarriers(data, bag.color))
        })
    })

    return matches
  }
}

exports.Task = Task
