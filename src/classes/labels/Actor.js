const Node = require('../Node');

class Actor extends Node {
  constructor(data) {
    super(data);
    this.label = 'Actor';
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
      {
        key: 'image',
        access: 'thumb',
        type: 'string',
      },
    ];
  }
}

module.exports = Actor;
