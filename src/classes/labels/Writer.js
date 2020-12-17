const Node = require('../Node');

class Writer extends Node {
  constructor(data) {
    super(data);
    this.label = 'Writer';
    this.props = [
      {
        key: 'id',
        type: 'ID',
      },
      {
        key: 'name',
        access: 'tag',
        type: 'string',
      },
    ];
  }
}

module.exports = Writer;
