const fs = require('fs');

const { escapeQuotes } = require('../utils');

class Relationship {
  constructor(start, type, end, role) {
    this.start = start;
    this.type = type;
    this.end = end;
    this.role = role;
    this.getRole = () => {
      let value = this.role;
      if (!value) {
        value = '';
      } else {
        value = escapeQuotes(value);
      }
      return value;
    };
  }

  writeHeader() {
    const file = 'output/Relationships_header.csv';
    const contents = ':START_ID,role,:END_ID,:TYPE';
    fs.writeFileSync(file, contents);
  }

  createStream() {
    const file = 'output/Relationships.csv';
    return fs.createWriteStream(file, { flags: 'a' });
  }

  writeRow(stream) {
    const contents = [this.start, this.getRole(), this.end, this.type].join(
      ','
    );
    stream.write(contents + '\n');
  }
}

module.exports = Relationship;
