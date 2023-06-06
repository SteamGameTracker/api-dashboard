import React, { useState, useEffect, Suspense  } from "react";
import { Tabs, Tab } from "react-bootstrap";
const GameCard = React.lazy(() => import("./Home/GameCard"));

export default function HomeView(props) {
  const [topFifty, setTopFifty] = useState([]);
  const [topSale, setTopSale]   = useState([]);
  const { games } = props;
  
  useEffect(() => {
    const checkSales = async (url) => {
      await fetch('http://localhost:8080/' + url, {mode:'cors'})
      .then(response => response.json())
      .then(data => {
        const date = new Date();
        //console.log(data);
        console.log(data)
        if(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` > data.date){
          getSales("topSellers");
        }
        else {
          console.log("local");
          setTopSale(data.applist);
       }
      })
      .catch(error => {
        console.error('request failed', error);
      });
    }

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
        //console.log(data);
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
          //console.log(data);
          setTopFifty(data);
        })
        .catch(error => {
          console.error('request failed', error);
        });
    }
    checkTop("topSellersJson");
    checkSales("topSellersOnSaleJson");
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
