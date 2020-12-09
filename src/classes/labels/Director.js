const Node = require('../Node');

class Director extends Node {
  constructor(data) {
    const label = 'Director';
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

module.exports = Director;
