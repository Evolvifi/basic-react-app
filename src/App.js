import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import "./App.css";

// Here we will add an custom event called onSelect add it to the propTypes also
const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    {/* Add a button here for the onSelect */}
    <td>
      <button onClick={() => onSelect(pokemon)}>Select</button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

// New component
const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      <tbody>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// PropTypes for the Pokemon Info

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};

function App() {
  // Create State for input
  const [filter, filterSet] = useState("");
  // Create State for input selected item
  const [selectedItem, selectedItemSet] = useState(null);
  const [pokemon, pokemonSet] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/basic-react-app/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data));
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1rem",
      }}
    >
      <h1 className="title">Pokemon Search</h1>

      {/* Adding the input tag so the user can search data remember to add format styles for tag in css file.  */}
      <input value={filter} onChange={(e) => filterSet(e.target.value)} />

      {/* Use this div to wrap the table and add inline style here */}
      <div
        style={{
          display: "grid",
          grifTemplateColumns: "70% 30%",
          gridColumnGap: "1rem",
        }}
      >
        <div>
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
                // adding filter to the table array iterator, filter applies to an array and returns only the array elements
                .filter((pokemon) =>
                  pokemon.name.english
                    .toLowerCase()
                    //includes is case sensitive so add toLoweCase() to filter
                    .includes(filter.toLowerCase())
                )
                .slice(0, 20)
                .map((pokemon) => (
                  // You have to add onSelect here are you will get an error that onSelect is not a function
                  <PokemonRow
                    pokemon={pokemon}
                    key={pokemon.id}
                    onSelect={(pokemon) => selectedItemSet(pokemon)}
                  />
                ))}
            </tbody>
          </table>
        </div>
        {/* this div is to show when there is an selectedItem you have to place it in an conditional and use a curly brace */}
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </div>
    </div>
  );
}

export default App;
