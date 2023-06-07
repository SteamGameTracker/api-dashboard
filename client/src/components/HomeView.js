import React, { useState, useEffect, Suspense  } from "react";
import { Tabs, Tab, Row, Col, Container } from "react-bootstrap";
import RadarCard from "./Charts/RadarCard";
import PieCard from "./Charts/PieCard";

import "./HomeView.css"

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
          getSales("topSellersOnSale");
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
    <div className="homeBody">
      <Tabs
        defaultActiveKey={"gamesOnSale"}
        id="top-sellers"
        className="mb-3 mx-5 fs-4 homeTabs"
        justify
      >
        <Tab eventKey="gamesOnSale" title="Top Games On Sale">
          <Row>
            <Col className="gameCardContainer">
              {topSale.map((game) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <GameCard
                  key = {game}
                  game = {game}/>
                </Suspense>
              ))}
            </Col>
            <Col className="col-3 ">
              <Row className="">
                <Col className="col-12">
                <RadarCard/>
                </Col>
                <Col className="col-12">
                <PieCard/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="topSellers" title="Top Sellers">
        <Row>
          <Col className="gameCardContainer">
            {topFifty.map((game) => (
              <Suspense fallback={<div>Loading...</div>}>
                <GameCard
                key = {game}
                game = {game}/>
              </Suspense>
            ))}
          </Col>
          <Col className="col-3 ">
              <Row className="">
                <Col className="col-12">
                <RadarCard/>
                </Col>
                <Col className="col-12">
                <PieCard/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
}
