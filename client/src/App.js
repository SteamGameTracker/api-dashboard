import {React, useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';

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
      setSteamData(data.applist.apps);
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
    callGameList();
    callGamePrice(252490);
    callPlayerCount(252490);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
    </div>
  );
}

export default App;
