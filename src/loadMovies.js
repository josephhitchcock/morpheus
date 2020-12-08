const fs = require('fs');

const { setFilename, getMovies, getMovie, loadMovie } = require('./utils');

(async () => {
  setFilename('load-movies.cypher');

  stream = fs.createWriteStream(`output/load-movies-log.txt`, { flags: 'a' });
  const log = message => stream.write(message + '\n');

  const all = await getMovies();

  const { MediaContainer } = all;
  const { Metadata = [] } = MediaContainer;

  const queue = Metadata.map(({ ratingKey: key }) => ({
    key,
  }));

  for (const [index, { key }] of queue.entries()) {
    log(`Fetching metadata for ${key}`);

    const data = await getMovie(key, log);

    const { MediaContainer } = data;
    const { Metadata } = MediaContainer;

    if (Metadata.length !== 1) {
      log('  Unexpected metadata');
      continue;
    }

    const { title, year } = Metadata[0];
    let percent = ((index + 1) / queue.length) * 100;
    percent = percent.toFixed(2).padStart(6, ' ');
    console.clear();
    console.log(`${percent}% | ${title} (${year})`);

    loadMovie(data, log);
  }
})();
