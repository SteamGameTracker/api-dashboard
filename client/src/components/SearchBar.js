import { React, useState, useEffect } from "react";
import { Form, Container, Dropdown, Row, Col } from "react-bootstrap";
import "./SearchBar.css";

//used to filter out game titles based on the user's input
const getFilteredGames = (query, games) => {
  if (!query) {
    return [];
  }
  return games.filter((game) =>
    game.name.toLowerCase().includes(query.toLowerCase())
  );
};

function SearchBar(props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const filteredGames = getFilteredGames(query, props.games);

  /*WORK IN PROGRESS, gets the title's appid that the user clicks on and makes a card the the id at the moment.
    Will need to be changed to update components on the page based on the appid being fed
  */
  const test = async (event) => {
    setSelected(event.eventKey);
    setQuery("");
    console.log(event);
  };

  return (
    <>
      <Container className="m-0 p-2">
        <Row>
          <Col>
            <Dropdown.Menu className="game-list" show>
              <Form className="p-2" onSubmit={test}>
                <Form.Label hidden>Search</Form.Label>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  onChange={(e) => setQuery(e.target.value)}
                />
                {filteredGames.slice(0, 20).map((value) => (
                  <Dropdown.Item
                    className="game-item"
                    eventKey={value.appid}
                    onClick={test}
                  >
                    {value.name}
                  </Dropdown.Item>
                ))}
              </Form>
            </Dropdown.Menu>
          </Col>
          <Col className="card">
            <p>{selected}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SearchBar;
