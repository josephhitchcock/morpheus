const Node = require('../Node');

class Collection extends Node {
  constructor(data) {
    super(data);
    this.label = 'Collection';
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

module.exports = Collection;
