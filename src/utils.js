const fs = require('fs');
const axios = require('axios');

const { baseURL, plexToken, libraryKey } = require('./config');
const { accessors } = require('./constants');

const nodes = new Set();
let stream;

const setFilename = filename => {
  stream = fs.createWriteStream(`output/${filename}`, { flags: 'a' });
};

const writeCypher = command => {
  stream.write(`${command}\n`);
};

const formatProps = props =>
  Object.entries(props)
    .filter(([_, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${key}: ${
          typeof value === 'string' ? `'${value.replace(/'/g, `\\'`)}'` : value
        }`
    )
    .join(', ');

function addNode({ data, label, relationship, direction, source, edgeProps }) {
  const nodeVar = `${label}_${data.id || data.ratingKey}`;

  if (!nodes.has(nodeVar)) {
    const nodeProps = formatProps(
      Object.entries(accessors[label]).reduce((acc, cur) => {
        const [key, value] = cur;
        if (value === true) {
          acc[key] = data[key];
        } else {
          acc[key] = data[value];
        }
        return acc;
      }, {})
    );
    writeCypher(`CREATE (${nodeVar}:${label} {${nodeProps}})`);
    nodes.add(nodeVar);
  }

  if (source) {
    const edge = edgeProps
      ? `:${relationship} {${formatProps(edgeProps)}}`
      : `:${relationship}`;

    direction === 'outgoing'
      ? writeCypher(`CREATE (${source})-[${edge}]->(${nodeVar})`)
      : writeCypher(`CREATE (${nodeVar})-[${edge}]->(${source})`);
  }
}

const loadMovie = (data, log) => {
  const { MediaContainer } = data;
  const { Metadata } = MediaContainer;

  Metadata.forEach(data => {
    const {
      ratingKey,
      Media = [],
      Genre = [],
      Director = [],
      Writer = [],
      Producer = [],
      Country = [],
      Guid = [],
      Collection = [],
      Role = [],
      Review = [],
    } = data;
    const movieVar = `Movie_${ratingKey}`;

    addNode({
      data,
      label: 'Movie',
    });

    Media.forEach(data => {
      addNode({
        data,
        label: 'Version',
        relationship: 'CONTAINS',
        direction: 'outgoing',
        source: movieVar,
      });

      const { id, Part = [] } = data;
      const versionVar = `Version_${id}`;

      Part.forEach(data => {
        addNode({
          data,
          label: 'Part',
          relationship: 'MADE_UP_OF',
          direction: 'outgoing',
          source: versionVar,
        });

        const { id, Stream = [] } = data;
        const partVar = `Part_${id}`;

        Stream.forEach(data => {
          let label;
          const { streamType } = data;

          if (streamType === 1) {
            label = 'Video';
          } else if (streamType === 2) {
            label = 'Audio';
          } else if (streamType === 3) {
            label = 'Subtitle';
          } else {
            log('  Unexpected stream');
            return;
          }

          addNode({
            data,
            label,
            relationship: 'CONSISTS_OF',
            direction: 'outgoing',
            source: partVar,
          });
        });
      });
    });

    Genre.forEach(data => {
      addNode({
        data,
        label: 'Genre',
        relationship: 'GROUPED_BY',
        direction: 'outgoing',
        source: movieVar,
      });
    });

    Director.forEach(data => {
      addNode({
        data,
        label: 'Director',
        relationship: 'DIRECTED',
        direction: 'incoming',
        source: movieVar,
      });
    });

    Writer.forEach(data => {
      addNode({
        data,
        label: 'Writer',
        relationship: 'WROTE',
        direction: 'incoming',
        source: movieVar,
      });
    });

    Producer.forEach(data => {
      addNode({
        data,
        label: 'Producer',
        relationship: 'PRODUCED',
        direction: 'incoming',
        source: movieVar,
      });
    });

    Country.forEach(data => {
      addNode({
        data,
        label: 'Country',
        relationship: 'FROM',
        direction: 'outgoing',
        source: movieVar,
      });
    });

    Guid.forEach(data => {
      const [agent, id] = data.id.split('://');
      addNode({
        data: { id, agent },
        label: 'Guid',
        relationship: 'IDENTIFIES',
        direction: 'incoming',
        source: movieVar,
      });
    });

    Collection.forEach(data => {
      addNode({
        data,
        label: 'Collection',
        relationship: 'BELONGS_TO',
        direction: 'outgoing',
        source: movieVar,
      });
    });

    Role.forEach(data => {
      const { role } = data;
      addNode({
        data,
        label: 'Actor',
        relationship: 'ACTED_IN',
        direction: 'incoming',
        source: movieVar,
        edgeProps: { role },
      });
    });

    Review.forEach(data => {
      addNode({
        data,
        label: 'Review',
        relationship: 'CRITIQUES',
        direction: 'incoming',
        source: movieVar,
      });
    });
  });
};

const getMovies = async () => {
  const url = `${baseURL}/library/sections/${libraryKey}/all?X-Plex-Token=${plexToken}`;
  let output;
  console.log('Fetching all movies, this may take a minute');
  await axios
    .get(url)
    .then(({ data }) => {
      output = data;
    })
    .catch(error => console.log(error));
  return output;
};

const getMovie = async (key, log) => {
  const url = `${baseURL}/library/metadata/${key}?X-Plex-Token=${plexToken}&checkFiles=1&includeReviews=1`;
  let output;
  await axios
    .get(url)
    .then(({ data }) => {
      output = data;
    })
    .catch(error => log(error));
  return output;
};

module.exports = { setFilename, getMovies, getMovie, loadMovie };
