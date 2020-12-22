# morpheus
 A tool to export Plex library metadata into a graph database

![image](https://user-images.githubusercontent.com/10837901/102830466-3a7b8780-439e-11eb-923b-8138eac9868d.png)
_The Matrix collection, visualized_

## Prerequisites
* [Node](https://nodejs.org/)
* [Neo4j](https://neo4j.com/download/)

## Library Export
1. Clone this repo onto the machine running your Plex server.
2. Run `npm install` to get dependencies (mainly [`axios`](https://www.npmjs.com/package/axios) for making network requests).
3. Open Plex (again on the same machine), navigate to any movie, `Get Info`, then `View XML`. Open `src/config.js` and enter the following values:
    - plexToken: Copy the `X-Plex-Token` value from the end of the URL
    - libraryKey: Copy the `librarySectionID` value from the `MediaContainer` entry on the first line
4. Execute `npm run load`. This will first make a network call to get basic information for all of your movies, and then make individual network calls to get detailed information about every movie. When run on the same machine as the Plex server I've seen this script complete about 1,000 requests/minute.

## Database Import
1. Open Neo4j Desktop, and create a project.
2. Inside of that project, create a local database.
3. Click on the overflow menu for that database, and select `Manage`.
4. In the dropdown next to `Open Folder` choose `Import`.
5. Move the contents of the `output` directory into this folder.
6. Finally, select `Open Terminal`, and execute the following command:
```
bin/neo4j-admin import --multiline-fields \
--nodes import/MovieNodes_header.csv,import/MovieNodes.csv \
--nodes import/VersionNodes_header.csv,import/VersionNodes.csv \
--nodes import/PartNodes_header.csv,import/PartNodes.csv \
--nodes import/VideoNodes_header.csv,import/VideoNodes.csv \
--nodes import/AudioNodes_header.csv,import/AudioNodes.csv \
--nodes import/SubtitleNodes_header.csv,import/SubtitleNodes.csv \
--nodes import/GenreNodes_header.csv,import/GenreNodes.csv \
--nodes import/DirectorNodes_header.csv,import/DirectorNodes.csv \
--nodes import/WriterNodes_header.csv,import/WriterNodes.csv \
--nodes import/ProducerNodes_header.csv,import/ProducerNodes.csv \
--nodes import/CountryNodes_header.csv,import/CountryNodes.csv \
--nodes import/GuidNodes_header.csv,import/GuidNodes.csv \
--nodes import/CollectionNodes_header.csv,import/CollectionNodes.csv \
--nodes import/ActorNodes_header.csv,import/ActorNodes.csv \
--nodes import/CriticNodes_header.csv,import/CriticNodes.csv \
--relationships import/Relationships_header.csv,import/Relationships.csv
```
Note that these files are generated dynamically, and it's possible your export didn't create all of them. For example, if you don't have any collections defined for your movie library, you would have to remove the line referencing those files for the script to execute successfully.

7. All that's left is to `Start` and then `Open with Neo4j Browser`.

## Examples
Now you have the metadata for your entire Plex movie library stored in a graph database. What can you do with that? Quite a lot, I thought I'd share some useful examples I've come up with so far to get you started. Neo4j uses a declarative query syntax called [Cypher](https://neo4j.com/developer/cypher/), which takes a little bit of getting used to, but ends up being a rather expressive way to search for and visualize relationships within your library.

### Movie Details
```
MATCH (m:Movie { title: "The Matrix"})<-[*1]-(in), (m)-[*]->(out)
RETURN *
```
This gets everything pertaining to a single movie, including all incoming nodes 1 hop away, and all connected outgoing nodes. This is a good start to see the type of data that's available, see [Label Documentation](#label-documentation) for more detailed information about each node.

### Busiest Actors
```
MATCH (a:Actor)-[:ACTED_IN]->(m:Movie)
WITH a, count(m) AS n
RETURN a.name AS Actor, n AS Movies
ORDER BY n DESCENDING
LIMIT 25
```
This returns a sorted list of actors by the number of movies they've acted in, data that's not readily available in Plex but is rather straightforward to gather from a graph.

### Random Movie
```
MATCH (m:Movie)-[:GROUPED_BY]->(g:Genre)
RETURN m.title as Title,
       m.year as Year,
       g.title as Genre,
       m.tagline as Tagline,
       m.summary as Summary
ORDER BY rand()
LIMIT 1
```
This returns a random movie and some information about it.

### Popular Genres
```
MATCH (m:Movie)-[:GROUPED_BY]->(g:Genre)
WITH g, count(m) AS n
RETURN g.title as Genre, n as Movies
ORDER BY n DESCENDING
```
Very similar to the actors query, this returns a list of genres sorted by how many movies belong to them.

### Common Actors
```
MATCH p = (source:Movie {title: 'The Matrix'})-[:ACTED_IN*2]-(other:Movie)
WITH *, relationships(p) AS a
RETURN *
```
This returns all movies that are connected to The Matrix by one of its actors.

### Connect Movies
```
MATCH (m1:Movie { title: 'The Matrix' }),
      (m2:Movie { title: 'The Shawshank Redemption' }),
      p = shortestPath((m1)-[:ACTED_IN*]-(m2))
RETURN p
```
This will attempt to find a path of actors connecting the given movies.

### Connect Actors
```
MATCH (a1:Actor { name: 'Keanu Reeves' }),
      (a2:Actor { name: 'Nicolas Cage' }),
      p = shortestPath((a1)-[:ACTED_IN*]-(a2))
RETURN p
```
Similarly, this will attempt to find a path of movies connecting the given actors.

### IMDb Matching
```
MATCH (g:Guid {agent: 'imdb'})-[:IDENTIFIES]->(m:Movie)
RETURN g.key AS key,
       m.title AS title,
       m.year AS year,
       m.rating AS rating,
       m.originallyAvailable AS originallyAvailable
```
This was actually why I wanted to pull my Plex library metadata in the first place, I used to use the Python [PlexAPI](https://pypi.org/project/PlexAPI/) to scrape a giant JSON file, but I was waiting on them to support Plex's latest Guid changes. Instead I built this because I figured there was some other stuff I could do, and it's cool that using this I can also pretty easily dump a JSON file with the information I want if needed.

## Label Documentation
This is a detailed overview of the various node types, the data they contain, and the way they're related to other nodes.

### Movie
Data
```
{
  key: string,
  guid: string,
  studio: string,
  title: string,
  sortTitle: string,
  contentRating: string,
  summary: string,
  rating: float,
  audienceRating: float,
  year: int,
  tagline: string,
  duration: int,
  originallyAvailable: string,
  addedAt: int,
  updatedAt: int,
  thumbnail: string,
  poster: string,
  audienceRatingImage: string,
  ratingImage: string
}
```
Relationships
```
(Movie)-[:CONTAINS]->(Version)
(Movie)-[:GROUPED_BY]->(Genre)
(Movie)-[:FROM]->(Country)
(Movie)-[:BELONGS_TO]->(Collection)
```

### Version

Data

```
{
  id: string,
  duration: int,
  bitrate: int,
  aspectRatio: float,
  resolution: string
}
```

Relationship
```
(Version)-[:MADE_UP_OF]->(Part)
```

### Part

Data
```
{
  id: string,
  duration: int,
  file: string,
  size: int,
  container: string
}
```

Relationships
```
(Part)-[:CONSISTS_OF]->(Video)
(Part)-[:CONSISTS_OF]->(Audio)
(Part)-[:CONSISTS_OF]->(Subtitle)
```

### Video

Data
```
{
  id: string,
  default: boolean,
  codec: string,
  bitrate: int,
  frameRate: float,
  height: int,
  profile: string,
  width: int,
  title: string
}
```

### Audio

Data
```
{
  id: string,
  default: boolean,
  codec: string,
  channels: int,
  channelLayout: string,
  bitrate: int,
  language: string,
  languageCode: string,
  profile: string,
  title: string
}
```

### Subtitle

Data
```
{
  id: string,
  file: string,
  codec: string,
  language: string,
  languageCode: string,
  format: string,
  title: string
}
```

### Genre

Data
```
{
  id: string,
  title: string
}
```

### Director

Data
```
{
 id: string,
 name: string
}
```

Relationship
```
(Director)-[:DIRECTED]->(Movie)
```

### Writer

Data
```
{
  id: string,
  name: string
}
```

Relationship
```
(Writer)-[:WROTE]->(Movie)
```

### Producer

Data
```
{
  id: string,
  name: string
}
```

Relationship
```
(Producer)-[:PRODUCED]->(Movie)
```

### Country

Data
```
{
  id: string,
  name: string
}
```

### Guid

Data
```
{
  id: string,
  agent: string,
  key: string
}
```

Relationship
```
(Guid)-[:IDENTIFIES]->(Movie)
```

### Collection

Data
```
{
  id: string,
  title: string
}
```

### Actor

Data
```
{
  key: string,
  name: string,
  image: string
}
```

Relationship
```
(Actor)-[:ACTED_IN]->(Movie)

{
  role: string
}
```

### Critic

Data
```
{
  id: string,
  name: string,
}
```

Relationship
```
(Critic)-[:REVIEWED]->(Movie)

{
  text: string,
  image: string,
  link: string,
  source: string
}
```
