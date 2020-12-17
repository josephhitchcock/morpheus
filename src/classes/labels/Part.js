const Node = require('../Node');

class Part extends Node {
  constructor(data) {
    super(data);
    this.label = 'Part';
    this.props = [
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
  }
}

module.exports = Part;
