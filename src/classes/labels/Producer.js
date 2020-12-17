const Node = require('../Node');

class Producer extends Node {
  constructor(data) {
    super(data);
    this.label = 'Producer';
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

module.exports = Producer;
