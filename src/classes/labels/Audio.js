const Node = require('../Node');

class Audio extends Node {
  constructor(data) {
    const label = 'Audio';
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
        key: 'channels',
        type: 'int',
      },
      {
        key: 'channelLayout',
        access: 'audioChannelLayout',
        type: 'string',
      },
      {
        key: 'bitrate',
        type: 'int',
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
        key: 'profile',
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

module.exports = Audio;
