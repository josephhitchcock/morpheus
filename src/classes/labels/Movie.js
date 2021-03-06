const Node = require('../Node');

class Movie extends Node {
  constructor(data) {
    super(data);
    this._id = data.key;
    this.label = 'Movie';
    this.props = [
      {
        key: 'key',
        type: 'ID',
      },
      {
        key: 'guid',
        type: 'string',
      },
      {
        key: 'studio',
        type: 'string',
      },
      {
        key: 'title',
        type: 'string',
      },
      {
        key: 'sortTitle',
        access: 'titleSort',
        type: 'string',
      },
      {
        key: 'contentRating',
        type: 'string',
      },
      {
        key: 'summary',
        type: 'string',
      },
      {
        key: 'rating',
        type: 'float',
      },
      {
        key: 'audienceRating',
        type: 'float',
      },
      {
        key: 'year',
        type: 'int',
      },
      {
        key: 'tagline',
        type: 'string',
      },
      {
        key: 'duration',
        type: 'int',
      },
      {
        key: 'originallyAvailable',
        access: 'originallyAvailableAt',
        type: 'string',
      },
      {
        key: 'addedAt',
        type: 'int',
      },
      {
        key: 'updatedAt',
        type: 'int',
      },
      {
        key: 'thumbnail',
        access: 'thumb',
        type: 'string',
      },
      {
        key: 'poster',
        access: 'art',
        type: 'string',
      },
      {
        key: 'audienceRatingImage',
        type: 'string',
      },
      {
        key: 'ratingImage',
        type: 'string',
      },
    ];
  }
}

module.exports = Movie;
