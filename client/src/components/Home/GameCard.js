import { useState, useEffect } from "react";
import FetchGameData from "../../fetchData";
import { Card, Container, Image, Row, Col, Tab, Tabs } from "react-bootstrap";
import Review from "./Review";

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
  const [type, setType]               = useState(false);

  const { game } = props;
  
  useEffect(() => {
    async function getData(gameId) {
      await FetchGameData({id:gameId})
      .then((response) => {
        console.log(response);
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
        
        if(response.gameDetails.type === "game")
          setType(true);
        else
          setType(false);
        console.log(type);
      });
    }

    getData(game);
  }, []);

  return (
    <div>
      <Container>
      <Row>
        <Col>
          <h2>{name}</h2>
          <Tabs 
            defaultActiveKey={"details"}
            id="card-tabs"
            className="mb-3"
          >
            <Tab eventKey="details" title="Details">
              <Image src={thumbnail} />
              <h3>Genres</h3>
              {genres && genres.map((genre) => (
                <p>{genre.description}</p>
              ))}
              <h3>Tags</h3>
              {categories && categories.map((category) => (
                <p>{category.description}</p>
              ))}
            </Tab>
            <Tab eventKey="reviews" title="Reviews">
              <Review
                key = {"review" + game} 
                review_desc = {reviews.query_summary ?
                               reviews.query_summary.review_score_desc :
                               "N/A"
                              }
                top_reviews = {reviews.reviews ?
                               reviews.reviews :
                               ["N/A"]
                              }
              />
            </Tab>
          </Tabs>
        </Col>
        <Col>
          {type ? 
            <iframe
            src={`https://steamdb.info/embed/?appid=${game}`} 
            height={389}
            width={600}
            loading={'lazy'}
            title={`Chart for ${730}showing concurrent players`}
            />
          : <p>No chart data for DLC</p>
          }
        </Col>
      </Row>
      </Container>
    </div>
  );
}
