const Node = require('../Node');

class Writer extends Node {
  constructor(data) {
    const label = 'Writer';
    const props = [
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
    super(label, data, props);
  }
}

module.exports = Writer;
