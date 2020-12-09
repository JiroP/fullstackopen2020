import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { BOOKS_BY_GENRE } from "../queries";

const Recommended = ({ show, currentUser }) => {
  const [books, setBooks] = useState([]);
  const [getRecommendedBooks, { loading, data }] = useLazyQuery(BOOKS_BY_GENRE);

  useEffect(() => {
    if (currentUser) {
      getRecommendedBooks({ variables: { genre: currentUser.favoriteGenre } });
    }
  }, [currentUser]); // eslint-disable-line

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks);
    }
  }, [data]);

  if (!show || !currentUser) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>{currentUser.favoriteGenre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Recommended;
