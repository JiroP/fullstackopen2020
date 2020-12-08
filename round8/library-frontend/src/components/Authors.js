import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Select from "react-select";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.log(error);
    }
  });
  const [authors, setAuthors] = useState([]);
  const [born, setBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors);
    }
  }, [result]);

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: selectedOption.value, setBornTo: parseInt(born) } });

    setBorn("");
  };

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const options = authors.map(({ name }) => ({ value: name, label: name }));

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
          {/* name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          /> */}
        </div>
        <div>
          born
          <input
            value={born}
            onChange={(event) => setBorn(event.target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
