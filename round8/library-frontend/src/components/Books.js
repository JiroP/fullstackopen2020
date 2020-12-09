import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries";
import GenreFilter from "./GenreFilter";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [allBooks, setAllBooks] = useState([]);
  const [renderedBooks, setRenderedBooks] = useState([]);
  const [filter, setFilter] = useState("");

  const [getGenreBooks, { loading, data }] = useLazyQuery(BOOKS_BY_GENRE);

  useEffect(() => {
    if (result.data) {
      setAllBooks(result.data.allBooks);
      setRenderedBooks(result.data.allBooks);
    }
  }, [result]);

  useEffect(() => {
    if (filter) {
      getGenreBooks({ variables: { genre: filter } });
    } else {
      setRenderedBooks(allBooks);
    }
  }, [filter]) //eslint-disable-line

  useEffect(() => {
    if (data) {
      setRenderedBooks(data.allBooks);
    }
  }, [data]);

  if (!props.show) {
    return null;
  }

  if (result.loading || loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {renderedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <GenreFilter setFilter={setFilter} books={allBooks} />
    </div>
  );
};

export default Books;
