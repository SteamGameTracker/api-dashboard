import { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import GameCard from "./Home/GameCard";

export default function HomeView(props) {
  const [topFifty, setTopFifty] = useState([]);
  const [topSale, setTopSale]   = useState([]);
  const { games } = props;
  console.log('test')
  useEffect(() => {
    async function getSales(url) {
      await fetch('http://localhost:8080/' + url, {mode:'cors'})
        .then(response => response.json())
        .then(data => {
          setTopSale(data);
        })
        .catch(error => {
          console.error('request failed', error);
        });
    }

    const checkTop = async (url) => {
      await fetch('http://localhost:8080/' + url, {mode:'cors'})
      .then(response => response.json())
      .then(data => {
        const date = new Date();
        if(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` > data.date){
          getTop("topSellers");
        }
        else {
          console.log("local");
          setTopFifty(data.applist);
          
       }
      })
      .catch(error => {
        console.error('request failed', error);
      });
    }

    async function getTop(url) {
      await fetch('http://localhost:8080/' + url, {mode:'cors'})
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setTopFifty(data);
        })
        .catch(error => {
          console.error('request failed', error);
        });
    }
    checkTop("topSellersJson")
    getSales("topSellersOnSale");
    //getTop("topSellers")
  }, []);


  return (
    <div>
      <Tabs
        defaultActiveKey={"gamesOnSale"}
        id="top-sellers"
        className="mb-3"
        justify
      >
        <Tab eventKey="gamesOnSale" title="Top Games On Sale">
          {topSale.slice(0, 2).map((game) => (
            <GameCard
            key = {game}
            game = {game}/>
          ))}
        </Tab>
        <Tab eventKey="topSellers" title="Top Selling Games">
          {topFifty.slice(0, 2).map((game) => (
            <GameCard
            key = {game.appid}
            game = {game.appid}/>
          ))}
        </Tab>
      </Tabs>
    </div>
  );
}
