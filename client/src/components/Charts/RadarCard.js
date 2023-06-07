import { React, useState, useEffect } from "react";
import { Container, Image, Row, Col, Tab, Tabs } from "react-bootstrap";


import RadarChart from "./RadarChart";
import './RadarCard.css';

function parseData(data) {
  let parsedData = {
    groupName: "Categories",
    list: []
  };

  let counts = [];

  data.forEach(game => {
    let categories = game.categories;
    if(categories) {
      categories.forEach(cat => {
        if(!counts[cat.description])
          counts[cat.description] = 1;
        else
          counts[cat.description]++;
      });
    }
  });

  Object.entries(counts).forEach(count => {
    const [key, value] = count;
    parsedData.list.push({name: key, count: value});
  });

  return parsedData;
}

const RadarCard = (props) => {
  const { data } = props;
  let parsedData = parseData(data);

  return (
    <div>
      
      <Container className="radar-card">
        <h2 className="radar-header">{parsedData.groupName}</h2>
        <RadarChart data={parsedData}/>
      </Container>
    </div>
  )
}

export default RadarCard;
