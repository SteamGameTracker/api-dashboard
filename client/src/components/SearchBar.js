import { React, useState, useRef } from "react";
import { Form, Container, Dropdown, Row, Col } from "react-bootstrap";
import "./SearchBar.css";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

//used to filter out game titles based on the user's input
const getFilteredGames = (query, games) => {
  //if query value is blank, an empty array is give so that games are not shown if no
  //search is being made
  if (!query) {
    return [];
  }
  //sorts by string length so closest matches show first
  return games.sort((a, b) => (a.name.length < b.name.length ? -1 : 1)).filter((game) => {
    return game.name.toLowerCase().includes(query.toLowerCase());
});
};

function SearchBar(props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const filteredGames = getFilteredGames(query, props.games);
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
  };

  return (
    <>
      <Container className="m-0 p-2">
        <Row>
          <Col>
            <Dropdown.Menu className="game-list" show>
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
                  className="game-item"
                  as="li"
                  key={value.appid}
                  eventkey={value.appid}
                  onClick={() => onSearch(value.appid)}
                >
                  {value.name}
                </DropdownItem>
              ))}
            </Dropdown.Menu>
          </Col>
          <Col className="card">
            <p>Call components here to show info based on this appid, {selected}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SearchBar;
