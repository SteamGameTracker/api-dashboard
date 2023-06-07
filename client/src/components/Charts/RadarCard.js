import { React, useState, useEffect } from "react";
import { Container, Image, Row, Col, Tab, Tabs } from "react-bootstrap";


import RadarChart from "./RadarChart";
import './RadarCard.css';

const fakeCategories = {
  groupName: "Categories",
  list: [
  {
    name: "Single-player",
    count: 30
  },
  {
    name: "Multi-player",
    count: 50
  },
  {
    name: "PvP",
    count: 40
  },
  {
    name: "Co-op",
    count: 35
  },
  {
    name: "Online Co-op",
    count: 20
  },
  {
    name: "Action",
    count: 65
  },
  {
    name: "RPG",
    count: 70
  },
  {
    name: "Steam Achievements",
    count: 100
  }
]
}

const RadarCard = (props) => {

  return (
    <div>
      
      <Container className="radar-card">
        <h2 className="radar-header">{fakeCategories.groupName}</h2>
        <RadarChart data={fakeCategories}/>
      </Container>
    </div>
  )
}

export default RadarCard;