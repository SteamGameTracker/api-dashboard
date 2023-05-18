import {React, useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [steamData, setSteamData] = useState([]);

  //pulls steam app list from middleware, 
  const makeAPICall = async () => {
    await fetch('http://localhost:8080/gamelist', {mode:'cors'})
    .then(response => {
      console.log('Success', response);
      return response.json();
    })
    .then(data => {
      setSteamData(data.applist.apps);
      console.log(steamData);
    })
    .catch(error => {
      console.error('request failed', error);
    });
  }
  useEffect(() => {
    makeAPICall();    
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
