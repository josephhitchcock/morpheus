const Node = require('../Node');

class Collection extends Node {
  constructor(data) {
    const label = 'Collection';
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

module.exports = Collection;
