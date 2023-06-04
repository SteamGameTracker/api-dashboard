import { React, useState, useEffect } from "react";
import { Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Navigationbar from "./components/Navbar";
import FetchGameData from "./fetchData";

function App() {
  const [steamData, setSteamData] = useState([]); //list of all games on steam
  const [topFifth, setTopFifth] = useState([]); //top fifty sold games
  const [topFifthOnSale, setTopFifthOnSale] = useState([]); //top fifty sold games on sale
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
      <Navigationbar games={steamData}/>
    </>
  )
}

export default App;
