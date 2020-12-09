const fs = require('fs');

const { escapeQuotes } = require('../utils');

class Node {
  constructor(label, data, props) {
    this.label = label;
    this.data = data;
    this.props = props;
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

  get id() {
    return String(this.data.id);
  }

  writeHeader() {
    const contents = this.props
      .map(entry => this.getHeader(entry))
      .concat(':LABEL')
      .join(',');
    const file = `output/${this.label}Nodes_header.csv`;
    fs.writeFileSync(file, contents);
  }

  createStream() {
    const file = `output/${this.label}Nodes.csv`;
    return fs.createWriteStream(file, { flags: 'a' });
  }

  writeRow(stream) {
    const contents = this.props
      .map(entry => this.getProp(entry))
      .concat(this.label)
      .join(',');
    stream.write(contents + '\n');
  }
}

module.exports = Node;
