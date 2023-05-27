import { React, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  const [steamData, setSteamData] = useState([]);

  //pulls steam app list from middleware, 
  const callGameList = async () => {
    await fetch('http://localhost:8080/gamelist', {mode:'cors'})
    .then(response => {
      console.log('Success', response);
      return response.json();
    })
    .then(data => {
      setSteamData([...data.applist.apps]);
      //console.log(steamData);
    })
    .catch(error => {
      console.error('request failed', error);
    });
  }

  const callGamePrice = async (gameId) => {
    await fetch(`http://localhost:8080/gamePrice/${gameId}`,{mode:'cors'})
    .then(response => {
      console.log('Success', response);
      return response.json();
    })
    .then(data => {
        console.log('Cost:', data[gameId].data.price_overview);
    })
    .catch(error => {
      console.error('request failed', error);
    });
  }

  const callPlayerCount = async (gameId) => {
    await fetch(`http://localhost:8080/playerCount/${gameId}`,{mode:'cors'})
    .then(response => {
      console.log('Success', response);
      return response.json();
    })
    .then(data => {
        console.log('Current Player Count:', data.response.player_count);
    })
    .catch(error => {
      console.error('request failed', error);
    });
  }

  useEffect(() => {
    let isloading = false;

    callGameList();
    callGamePrice(252490);
    callPlayerCount(252490);
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
      <SearchBar games={steamData} />
    </>
  );
}

export default App;
