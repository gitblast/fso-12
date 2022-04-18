import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import Select from "react-select";

import { SET_BIRTHYEAR } from "../mutations";
import { ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const [authors, setAuthors] = React.useState([]);
  const [name, setName] = React.useState("");
  const [born, setBorn] = React.useState("");

  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  React.useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors);
    }
  }, [result]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    editAuthor({ variables: { name, setBornTo: Number(born) } });
  };

  const getOptions = () =>
    authors.map((a) => ({ value: a.name, label: a.name }));

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
      <div>
        <h2>Set birthyear</h2>
        <Select
          onChange={(selection) => setName(selection.value)}
          defaultValue={name}
          options={getOptions()}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button onClick={handleClick}>update author</button>
      </div>
    </div>
  );
};

export default Authors;
