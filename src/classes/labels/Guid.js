const Node = require('../Node');

class Guid extends Node {
  constructor(data) {
    const label = 'Guid';
    const props = [
      {
        key: 'id',
        type: 'ID',
      },
      {
        key: 'agent',
        type: 'string',
      },
      {
        key: 'key',
        type: 'string',
      },
    ];
    super(label, data, props);
    this.getID = () => `guid/${this.data.id}`;
  }
}

module.exports = Guid;
