const Node = require('../Node');

class Genre extends Node {
  constructor(data) {
    const label = 'Genre';
    const props = [
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
    super(label, data, props);
  }
}

module.exports = Genre;
