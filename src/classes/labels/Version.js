const Node = require('../Node');

class Version extends Node {
  constructor(data) {
    super(data);
    this.label = 'Version';
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
  }
}

module.exports = Version;
