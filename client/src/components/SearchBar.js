import { React, useState, useRef, useEffect, Suspense } from "react";
import { Form, Container, Dropdown, Row, Col } from "react-bootstrap";
import "./SearchBar.css";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import GameCard from './Home/GameCard';
import FetchGameData from "../fetchData";
import RadarCard from "./Charts/RadarCard";
import PieCard from "./Charts/PieCard";

//used to filter out game titles based on the user's input
const getFilteredGames = (query, games) => {
  //if query value is blank, an empty array is give so that games are not shown if no search is being made
  if (!query) {
    return [];
  }
  //sorts by string length so closest matches show first
  return games.sort((a, b) => (a.name.length < b.name.length ? -1 : 1)).filter((game) => {
    return game.name.toLowerCase().includes(query.toLowerCase());
  });
};

function SearchBar(props) {
  const [query, setQuery] = useState(""); //string used for searching game name
  const [selected, setSelected] = useState(0); //game's appid when selected from searchbar dropdown
  const [game, setGame] = useState({});
  const { games } = props;
  const filteredGames = getFilteredGames(query, games); //filtered list of games bases on query
  const ref = useRef(null);

  //each time the input from user changes the query value is updated
  const onChange = (event) => {
    setQuery(event.target.value);
  }

  //When listed game is clicked on, appid will be set in selected and search bar will be reset
  const onSearch = (id) => {
    setSelected(id);
    setQuery('');
    ref.current.value = '';
    const getGameData = async () => {
      const data = await FetchGameData({id:id})
      let gameObj = data.gameDetails;
      let gameReview = data.reviews;
      gameObj["review"] = gameReview;

      setGame(gameObj);
    }
    if (id !== 0){
      getGameData()
      .catch(console.error);
    }
  };
  return (
    <div className="search-page">
        <Row className="search-row w-25 mx-auto">
            <Dropdown.Menu className="w-25 mx-auto mt-3 p-0" show>
              <Form.Label hidden>Search</Form.Label>
              <Form.Control
                type="text"
                ref={ref}
                placeholder="Search"
                onChange={onChange}
              />
              {filteredGames.slice(0, 20)
              .map((value) => (
                <DropdownItem
                  className=""
                  as="li"
                  key={value.appid}
                  onClick={() => onSearch(value.appid)}
                >
                  {value.name}
                </DropdownItem>
              ))}
            </Dropdown.Menu>
        </Row>
        {game.steam_appid ? 
          <Row>
              <Col className="gameCardContainer">
                <Suspense fallback={<div>Loading...</div>}>
                  <GameCard
                  key = {selected}
                  game = {game}/>
                </Suspense>
              </Col>
          </Row>
        : <h2 className="search-header text-center">Type name of game to search</h2>}
    </div>
  );
}

export default SearchBar;
