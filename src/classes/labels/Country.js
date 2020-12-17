const Node = require('../Node');

class Country extends Node {
  constructor(data) {
    super(data);
    this.label = 'Country';
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
    ];
  }
}

module.exports = Country;
