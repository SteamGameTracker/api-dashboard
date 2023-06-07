import { React, useState, useEffect } from "react";
import { Container, Image, Row, Col, Tab, Tabs } from "react-bootstrap";
import PieChart from "./PieChart";
import './PieCard.css';

const fakeCategories = {
  groupName: "Average Metacritic Score",
  list: [
  {
    name: "Bad",
    count: 50
  },
  {
    name: "Good",
    count: 50
  },
]
}

const PieCard = (props) => {

  return (
    <div>
      
      <Container className="pie-card">
        <h2 className="pie-header">{fakeCategories.groupName}</h2>
        <PieChart data={fakeCategories}/>
        <h3 className="pie-footer">{fakeCategories.list[1].count}%</h3>
      </Container>
    </div>
  )
}

export default PieCard;