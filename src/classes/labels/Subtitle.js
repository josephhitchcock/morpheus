const Node = require('../Node');

class Subtitle extends Node {
  constructor(data) {
    const label = 'Subtitle';
    const props = [
      {
        key: 'id',
        type: 'ID',
      },
      {
        key: 'file',
        type: 'string',
      },
      {
        key: 'codec',
        type: 'string',
      },
      {
        key: 'language',
        type: 'string',
      },
      {
        key: 'languageCode',
        type: 'string',
      },
      {
        key: 'format',
        type: 'string',
      },
      {
        key: 'title',
        access: 'displayTitle',
        type: 'string',
      },
    ];
    super(label, data, props);
  }
}

module.exports = Subtitle;
