import { React, useState, useEffect } from "react";
import { Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigationbar from "./components/Navbar";

function App() {
  const [steamData, setSteamData] = useState([]); //list of all games on steam
  
  //pulls steam app list from server json file, and checks that it's up to date
  //if not up to date, it will call api to update the json file
  const checkDataStatus = async () => {
    await fetch(`http://localhost:${process.env.REACT_APP_PORT}/gamefile`, {mode:'cors'})
    .then(response => {
      return response.json();
    })
    .then(data => {
      const date = new Date();
      console.log(data.date);
      if(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` > data.date){
        console.log("api");
        callGameList(-1);
      }
      else {
        console.log("local");
        setSteamData(data.applist);
        
      }
    })
    .catch(error => {
      console.error('request failed', error);
    });
  }
  const callGameList = async (gameId) => {
    await fetch(`http://localhost:${process.env.REACT_APP_PORT}/gamelist/${gameId}`, {mode:'cors'})
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

  //triggers once when app loads
  useEffect(() => {
    checkDataStatus();
    //callGameList(-1);
  }, []);

  return (
    <div className="background">
      <Navigationbar games={steamData}/>
    </div>
  )
}

export default App;
