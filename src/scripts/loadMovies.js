const NodeFactory = require('../classes/NodeFactory');

const { getMovies, getMovie } = require('../requests');

(async () => {
  const nodeFactory = new NodeFactory();

  const all = await getMovies();

  const { MediaContainer } = all;
  const { Metadata = [] } = MediaContainer;

  const queue = Metadata.map(({ ratingKey: key }) => ({
    key,
  }));

  const startTime = new Date().getTime();

  for (const [index, { key }] of queue.entries()) {
    const data = await getMovie(key);

    const { MediaContainer } = data;
    const { Metadata } = MediaContainer;

    if (Metadata.length !== 1) {
      continue;
    }

    Metadata.forEach(data => {
      const {
        title,
        year,
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

      const percent = ((index + 1) / queue.length) * 100;
      const formattedPercent = percent.toFixed(2).padStart(6, ' ');

      console.clear();
      console.log(`${formattedPercent}% | ${title} (${year})`);

      const movie = nodeFactory.add('Movie', data);

      Media.forEach(data => {
        const version = nodeFactory.add('Version', data);
        nodeFactory.relate(movie, 'CONTAINS', version);

        const { Part = [] } = data;

        Part.forEach(data => {
          const part = nodeFactory.add('Part', data);
          nodeFactory.relate(version, 'MADE_UP_OF', part);

          const { Stream = [] } = data;

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
              return;
            }

            const component = nodeFactory.add(label, data);
            nodeFactory.relate(part, 'CONSISTS_OF', component);
          });
        });
      });

      Genre.forEach(data => {
        const genre = nodeFactory.add('Genre', data);
        nodeFactory.relate(movie, 'GROUPED_BY', genre);
      });

      Director.forEach(data => {
        const director = nodeFactory.add('Director', data);
        nodeFactory.relate(director, 'DIRECTED', movie);
      });

      Writer.forEach(data => {
        const writer = nodeFactory.add('Writer', data);
        nodeFactory.relate(writer, 'WROTE', movie);
      });

      Producer.forEach(data => {
        const producer = nodeFactory.add('Producer', data);
        nodeFactory.relate(producer, 'PRODUCED', movie);
      });

      Country.forEach(data => {
        const country = nodeFactory.add('Country', data);
        nodeFactory.relate(movie, 'FROM', country);
      });

      Guid.forEach(data => {
        const [agent, key] = data.id.split('://');
        const guid = nodeFactory.add('Guid', { ...data, agent, key });
        nodeFactory.relate(guid, 'IDENTIFIES', movie);
      });

      Collection.forEach(data => {
        const collection = nodeFactory.add('Collection', data);
        nodeFactory.relate(movie, 'BELONGS_TO', collection);
      });

      Role.forEach(data => {
        const { role } = data;
        const actor = nodeFactory.add('Actor', data);
        nodeFactory.relate(actor, 'ACTED_IN', movie, role);
      });

      Review.forEach(data => {
        const review = nodeFactory.add('Review', data);
        nodeFactory.relate(review, 'CRITIQUES', movie);
      });
    });
  }

  const endTime = new Date().getTime();

  const count = queue.length.toLocaleString();
  const difference = (endTime - startTime) / 1000;
  const minutes = Math.floor(difference / 60);
  const seconds = Math.round(difference % 60);

  console.clear();
  console.log(`Exported ${count} movies in ${minutes}m ${seconds}s`);
})();
