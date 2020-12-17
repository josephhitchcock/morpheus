const Node = require('../Node');

class Genre extends Node {
  constructor(data) {
    super(data);
    this.label = 'Genre';
    this.props = [
      {
        key: 'id',
        type: 'ID',
      },
      {
        key: 'title',
        access: 'tag',
        type: 'string',
      },
    ];
  }
}

module.exports = Genre;
