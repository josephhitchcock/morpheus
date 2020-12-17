const fs = require('fs');

const { escapeQuotes } = require('../utils');

class Relationship {
  constructor(start, type, end, data = {}) {
    this.start = start;
    this.type = type;
    this.end = end;
    this.data = data;
    this.props = [
      {
        key: 'role',
        type: 'string',
      },
      {
        key: 'text',
        type: 'string',
      },
      {
        key: 'image',
        type: 'string',
      },
      {
        key: 'link',
        type: 'string',
      },
      {
        key: 'source',
        type: 'string',
      },
    ];
    this.getHeader = entry => {
      const { key, type } = entry;
      return `${key}:${type}`;
    };
    this.getProp = entry => {
      const { key, access, type } = entry;
      let value = this.data[access || key];
      if (!value) {
        value = '';
      } else if (type === 'string') {
        value = escapeQuotes(value);
      } else if (type === 'boolean') {
        return value ? 'true' : 'false';
      }
      return value;
    };
  }

  writeHeader() {
    const file = 'output/Relationships_header.csv';
    const contents = [':START_ID']
      .concat(this.props.map(entry => this.getHeader(entry)))
      .concat([':END_ID', ':TYPE'])
      .join(',');
    fs.writeFileSync(file, contents);
  }

  createStream() {
    const file = 'output/Relationships.csv';
    return fs.createWriteStream(file, { flags: 'a' });
  }

  writeRow(stream) {
    const contents = [this.start]
      .concat(this.props.map(entry => this.getProp(entry)))
      .concat([this.end, this.type])
      .join(',');
    stream.write(contents + '\n');
  }
}

module.exports = Relationship;
