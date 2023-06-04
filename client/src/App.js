import { React, useState, useEffect } from "react";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchBar from "./components/SearchBar";
import HomeView from "./components/HomeView";
import FetchGameData from "./fetchData";

function App() {
  const [steamData, setSteamData] = useState([]); //list of all games on steam
  //pulls steam app list 
  const callGameList = async (gameId) => {
    await fetch(`http://localhost:8080/gamelist/${gameId}`, {mode:'cors'})
    .then(response => {
      //console.log('Success', response);
      return response.json();
    })
    .then(data => {
      //if have more results, call again
      setSteamData(steamData => steamData.concat(data.response.apps));
      if(data.response.have_more_results){
        callGameList(data.response.last_appid);
      }
    })
    .catch(error => {
      console.error('request failed', error);
    });
  }

  //triggers once when app loads
  useEffect(() => {
    callGameList(-1);
  }, []);

  return (
    <>
      {/* Not sure if we need/want a nav bar, let me know if you think we should change or get rid of this */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">GameDashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#sales">Sales</Nav.Link>
            <Nav.Link href="#pricing">Something</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <HomeView games={steamData}/>
    </>
  )
}

export default App;
