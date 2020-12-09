const Node = require('../Node');

class Version extends Node {
  constructor(data) {
    const label = 'Version';
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
        key: 'bitrate',
        type: 'int',
      },
      {
        key: 'aspectRatio',
        type: 'float',
      },
      {
        key: 'resolution',
        access: 'videoResolution',
        type: 'string',
      },
    ];
    super(label, data, props);
  }
}

module.exports = Version;
