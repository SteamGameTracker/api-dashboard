import { useState, useEffect } from "react";
import FetchGameData from "../../fetchData";
import { Card, Container, Image, Row, Col, Tab, Tabs } from "react-bootstrap";

export default function GameCard(props) {
  const [name, setName]               = useState("");
  const [thumbnail, setThumb]         = useState("");
  const [playerCount, setPlayerCount] = useState(0);
  const [categories, setCategories]   = useState([]);
  const [genres, setGenres]           = useState([]);
  const [platforms, setPlatforms]     = useState([]);
  const [price, setPrice]             = useState({});
  const [publishers, setPublishers]   = useState([]);
  const [age, setAge]                 = useState(0);
  const [metacritic, setMetacritic]   = useState({});
  const [about, setAbout]             = useState("");
  const [reviews, setReviews]         = useState({});

  const { game } = props;
  
  useEffect(() => {
    async function getData(gameId) {
      await FetchGameData({id:gameId})
      .then((response) => {
        setName(response.gameDetails.name);
        setThumb(response.gameDetails.header_image);
        setPlayerCount(response.players);
        setCategories(response.gameDetails.categories);
        setGenres(response.gameDetails.genres);
        setPlatforms(response.gameDetails.platforms);
        setPrice(response.price);
        setAge(response.gameDetails.required_age);
        setMetacritic(response.gameDetails.metacritic);
        setAbout(response.gameDetails.about);
        setReviews(response.reviews);
      });
    }

    getData(game);
  }, []);

  return (
    <div>
      <Container>
      <Row>
        <Col>
          <p>{name}</p>
          <Tabs 
            defaultActiveKey={"details"}
            id="card-tabs"
            className="mb-3"
          >
            <Tab eventKey="details" title="Details">
              <Image src={thumbnail} />
              <p>{}</p>
            </Tab>
            <Tab eventKey="reviews" title="Reviews">
              
            </Tab>
          </Tabs>
          
        </Col>
        <Col>
        <iframe
          src={`https://steamdb.info/embed/?appid=${game}`} 
          height={389}
          width={600}
          loading={'lazy'}
          title={`Chart for ${730}showing concurrent players`}/>
        </Col>
      </Row>
      </Container>
    </div>
  );
}
