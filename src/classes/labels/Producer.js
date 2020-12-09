const Node = require('../Node');

class Producer extends Node {
  constructor(data) {
    const label = 'Producer';
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

module.exports = Producer;
