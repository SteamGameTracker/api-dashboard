import { useState, useEffect} from "react";
import FetchGameData from "../../fetchData";
import { Container, Image, Row, Col, Tab, Tabs } from "react-bootstrap";
import Review from "./Review";
import "./GameCard.css";

export default function GameCard(props) {
  const [name, setName]               = useState("");
  const [thumbnail, setThumb]         = useState("");
  const [playerCount, setPlayerCount] = useState(0);
  const [categories, setCategories]   = useState([]);
  const [genres, setGenres]           = useState([]);
  const [platforms, setPlatforms]     = useState({});
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
        setPublishers(response.gameDetails.publishers);
        setPrice(response.price);
        setAge(response.gameDetails.required_age);
        setMetacritic(response.gameDetails.metacritic);
        setAbout(response.gameDetails.about_the_game);
        setReviews(response.reviews);
        
        if(response.gameDetails.type === "game")
          setType(true);
        else
          setType(false);
      });
    }

    getData(game);
  }, []);

  return (
    <div>
      <Container className="gameCard">
      <h2 className="gameHeader">{name}</h2>
      <Row>
        <Col>
          <Tabs 
            defaultActiveKey={"about"}
            id="card-tabs"
            className="mb-3"
          >
            <Tab eventKey="about" title="About" className="aboutContainer">
              <Row>
                <Col>
                  <Image
                    className="thumbnail"
                    src={thumbnail} 
                  />
                </Col>
                <Col>
                  <h3>Current Price: {price ? price.final_formatted : "N/A"}</h3>
                  {price &&
                  <div>
                    <h4>Discount: {price.discount_percent}%</h4>
                    <h4>Was Previously: {price.initial_formatted}</h4>
                  </div>
                  }
                </Col>
              </Row>
              <hr></hr>
              <h3>About:</h3>
              <p>{about && 
                  about.replaceAll('<br />', '<br>').split('<br>').map(str => <p>{str}</p>)
                  }
              </p>
            </Tab>
            <Tab eventKey="reviews" title="Reviews" className="reviewContainer">
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
            <Tab eventKey="details" title="Details" className="detailsContainer">
              <Row>
                <Col>
                  <h3>Age Rating: {age}</h3>
                  <hr></hr>
                  <h3>Publishers:</h3>
                  <p>{publishers.join(", ")}</p>
                  <hr></hr>
                  {metacritic &&
                  <div>
                    <h3>Metacritic:</h3>
                    <p>Score: {metacritic.score}</p>
                    <a href={metacritic.url}>Metacritic Review Page</a>
                    <hr></hr>
                  </div>
                  }
                  <h3>Platforms:</h3>
                  <ul>
                    <li>Windows: {platforms.windows ? "Supported" : "Not Supported"}</li>
                    <li>Mac: {platforms.mac ? "Supported" : "Not Supported"}</li>
                    <li>Linux: {platforms.linux ? "Supported" : "Not Supported"}</li>
                  </ul>
                </Col>
                <Col>
                  <h3>Genres</h3>
                  {genres && genres.map((genre) => (
                    <p>{genre.description}</p>
                  ))}
                  <hr></hr>
                  <h3>Tags</h3>
                  {categories && categories.map((category) => (
                    <p>{category.description}</p>
                  ))}
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Col>
        <Col>
          {type ? 
            <iframe
            className="playerChart"
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
