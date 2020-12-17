const Node = require('../Node');

class Director extends Node {
  constructor(data) {
    super(data);
    this.label = 'Director';
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

module.exports = Director;
