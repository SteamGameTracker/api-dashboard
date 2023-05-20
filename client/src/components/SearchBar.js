import {React, useState, useEffect} from "react";

const getFilteredGames = (query, games) => {
  if (!query) {
    return [];
  }
  return games.filter(game => game.name.toLowerCase().includes(query.toLowerCase()));
}

function SearchBar(props) {
  const [query, setQuery] = useState('');
  const filteredGames = getFilteredGames(query, props.games);

  return (
    <div>
      <label>Search</label>
      <input type="text" onChange={e => setQuery(e.target.value)} />
      <ul>
        {filteredGames.slice(0, 20).map(value => <h1 key={value.appid}>Name : {value.name}, ID: {value.appid}</h1>)}
      </ul>

    </div>
  );


}

export default SearchBar;