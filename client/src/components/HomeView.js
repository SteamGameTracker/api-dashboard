import React, { useState, useEffect, Suspense  } from "react";
import { Tabs, Tab } from "react-bootstrap";
const GameCard = React.lazy(() => import("./Home/GameCard"));

export default function HomeView(props) {
  const [topFifty, setTopFifty] = useState([]);
  const [topSale, setTopSale]   = useState([]);
  const { games } = props;

  useEffect(() => {
    async function getSales(url) {
      await fetch('http://localhost:8080/' + url, {mode:'cors'})
        .then(response => response.json())
        .then(data => {
          const regex = /(?<=https:\/\/store\.steampowered\.com\/app\/).[0-9]+/gm;
          const array = data.match(regex);
          setTopSale(array);
        })
        .catch(error => {
          console.error('request failed', error);
        });
    }

    async function getTop(url) {
      await fetch('http://localhost:8080/' + url, {mode:'cors'})
        .then(response => response.json())
        .then(data => {
          const regex = /(?<=https:\/\/store\.steampowered\.com\/app\/).[0-9]+/gm;
          const array = data.match(regex);
          setTopFifty(array);
        })
        .catch(error => {
          console.error('request failed', error);
        });
    }

    getSales("topSellersOnSale");
    getTop("topSellers")
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
          {topSale.map((game) => (
            <Suspense fallback={<div>Loading...</div>}>
              <GameCard
              key = {game}
              game = {game}/>
            </Suspense>
          ))}
        </Tab>
        <Tab eventKey="topSellers" title="Top Sellers">
          {topFifty.map((game) => (
            <Suspense fallback={<div>Loading...</div>}>
              <GameCard
              key = {game}
              game = {game}/>
            </Suspense>
          ))}
        </Tab>
        
      </Tabs>
    </div>
  );
}
