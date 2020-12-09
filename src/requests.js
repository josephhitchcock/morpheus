const axios = require('axios');

const { baseURL, plexToken, libraryKey } = require('./config');

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

const getMovie = async key => {
  const url = `${baseURL}/library/metadata/${key}?X-Plex-Token=${plexToken}&checkFiles=1&includeReviews=1`;
  let output;
  await axios
    .get(url)
    .then(({ data }) => {
      output = data;
    })
    .catch(error => console.log(error));
  return output;
};

module.exports = { getMovies, getMovie };
