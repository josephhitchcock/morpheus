const Node = require('../Node');

class Guid extends Node {
  constructor(data) {
    super(data);
    this.label = 'Guid';
    this.props = [
      {
        key: 'id',
        type: 'ID',
      },
      {
        key: 'agent',
        type: 'string',
      },
      {
        key: 'key',
        type: 'string',
      },
    ];
  }
}

module.exports = Guid;
