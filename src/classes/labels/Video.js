const Node = require('../Node');

class Video extends Node {
  constructor(data) {
    const label = 'Video';
    const props = [
      {
        key: 'id',
        type: 'ID',
      },
      {
        key: 'default',
        type: 'boolean',
      },
      {
        key: 'codec',
        type: 'string',
      },
      {
        key: 'bitrate',
        type: 'int',
      },
      {
        key: 'frameRate',
        type: 'float',
      },
      {
        key: 'height',
        type: 'int',
      },
      {
        key: 'profile',
        type: 'string',
      },
      {
        key: 'width',
        type: 'int',
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

module.exports = Video;
