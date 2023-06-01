import { React, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchBar from "./components/SearchBar";
import FetchGameData from "./fetchData";

function App() {
  const [steamData, setSteamData] = useState([]); //list of all games on steam
  const [topFifth, setTopFifth] = useState([]);
  const [topFifthOnSale, setTopFifthOnSale] = useState([]);
  //pulls steam app list 
  const callGameList = async (gameId) => {
    await fetch(`http://localhost:8080/gamelist/${gameId}`, {mode:'cors'})
    .then(response => {
      console.log('Success', response);
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

  //pulls html of steam's top selling games, and filters out the appid's of the top 50
  const callTopFifty = async () => {
    await fetch('http://localhost:8080/topSellers', {mode:'cors'})
    .then(response => {
      console.log('Success', response);
      return response.json();
    })
    .then(data => {
      const regex = /(?<=https:\/\/store\.steampowered\.com\/app\/).[0-9]+/gm;
      const array = data.match(regex);
      setTopFifth([...array]);
      //console.log('top 50 sellers:' , topFifth);
    })
    .catch(error => {
      console.error('request failed', error);
    });
  }

  const callTopFiftyOnSale = async () => {
    await fetch('http://localhost:8080/topSellersOnSale', {mode:'cors'})
    .then(response => {
      console.log('Success', response);
      return response.json();
    })
    .then(data => {
      const regex = /(?<=https:\/\/store\.steampowered\.com\/app\/).[0-9]+/gm;
      const array = data.match(regex);
      setTopFifthOnSale([...array]);
      //console.log('top 50 sellers on sale:' , array);
    })
    .catch(error => {
      console.error('request failed', error);
    });
  }

  //triggers once when app loads
  useEffect(() => {
    callGameList(-1);
    callTopFifty();
    callTopFiftyOnSale();
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
