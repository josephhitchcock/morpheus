const Node = require('../Node');

class Country extends Node {
  constructor(data) {
    const label = 'Country';
    const props = [
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
    super(label, data, props);
  }
}

module.exports = Country;
