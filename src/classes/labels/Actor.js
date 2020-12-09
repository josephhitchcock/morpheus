const Node = require('../Node');

class Actor extends Node {
  constructor(data) {
    const label = 'Actor';
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
      {
        key: 'image',
        access: 'thumb',
        type: 'string',
      },
    ];
    super(label, data, props);
  }
}

module.exports = Actor;
