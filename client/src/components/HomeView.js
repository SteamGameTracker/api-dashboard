import { useState, useEffect } from "react";
import GameCard from "./Home/GameCard";

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
      {topSale.map((game) => (
      <GameCard
      key = {game}
      game={game}/>
      ))}
    </div>
  );
}
