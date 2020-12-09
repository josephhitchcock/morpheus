const Node = require('../Node');

class Part extends Node {
  constructor(data) {
    const label = 'Part';
    const props = [
      {
        key: 'id',
        type: 'ID',
      },
      {
        key: 'duration',
        type: 'int',
      },
      {
        key: 'file',
        type: 'string',
      },
      {
        key: 'size',
        type: 'int',
      },
      {
        key: 'container',
        type: 'string',
      },
    ];
    super(label, data, props);
  }
}

module.exports = Part;
