const Node = require('../Node');

class Review extends Node {
  constructor(data) {
    const label = 'Review';
    const props = [
      {
        key: 'id',
        type: 'ID',
      },
      {
        key: 'critic',
        access: 'tag',
        type: 'string',
      },
      {
        key: 'text',
        type: 'string',
      },
      {
        key: 'image',
        type: 'string',
      },
      {
        key: 'link',
        type: 'string',
      },
      {
        key: 'source',
        type: 'string',
      },
    ];
    super(label, data, props);
  }
}

module.exports = Review;
