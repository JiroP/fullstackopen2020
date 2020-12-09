import React from "react";

const GenreFilter = ({ books, setFilter }) => {
  if (!books.length) {
    return null;
  }

  const genreSet = new Set("");
  books.forEach(({ genres }) => genres.forEach((g) => genreSet.add(g)));

  const genres = [...genreSet];

  return (
    <>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter("")}>all genres</button>
    </>
  );
};

export default GenreFilter;
