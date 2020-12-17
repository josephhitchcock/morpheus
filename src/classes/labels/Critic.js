const Node = require('../Node');

class Critic extends Node {
  constructor(data) {
    super(data);
    this.label = 'Critic';
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

module.exports = Critic;
