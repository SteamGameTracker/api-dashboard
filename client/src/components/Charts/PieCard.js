import { React, useState, useEffect } from "react";
import { Container, Image, Row, Col, Tab, Tabs } from "react-bootstrap";
import PieChart from "./PieChart";
import './PieCard.css';

const PieCard = (props) => {
  const { data } = props;

  let score = 0;
  let count = 0;

  data.forEach(game => {
    if(game.metacritic) {
      score += game.metacritic.score;
      count++;
    }
  });

  let average = Math.round((score / count) * 100) / 100;

  let parsedData = {
    groupName: "Average Metacritic Score",
    list: [
    {
      name: "Bad",
      count: 100 - average
    },
    {
      name: "Good",
      count: average 
    },
  ]
  }

  score = score / count;

  return (
    <div>
      
      <Container className="pie-card">
        <h2 className="pie-header">{parsedData.groupName}</h2>
        <PieChart data={parsedData}/>
        <h3 className="pie-footer">{parsedData.list[1].count}%</h3>
      </Container>
    </div>
  )
}

export default PieCard;
