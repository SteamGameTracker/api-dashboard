import { Container, Image, Row, Col, Tab, Tabs } from "react-bootstrap";
import Review from "./Review";
import Movies from "./Movies";
import Screenshots from "./Screenshots";

import "./GameCard.css";


export default function GameCard(props) {

  const { type, 
          name, 
          about_the_game, 
          categories,
          genres,
          platforms,
          header_image,
          price_overview,
          publishers,
          required_age,
          metacritic,
          review,
          screenshots,
          movies,
          steam_appid} = props.game;
  
  //console.log(props);

  return (
    <div>
      <Container className="gameCard">
      <h2 className="gameHeader">{name}</h2>
      <Row>
        <Col>
          <Tabs 
            defaultActiveKey={"about"}
            id="card-tabs"
            className="mb-3 mx-3 gameTabs"
          >
            <Tab eventKey="about" title="About" className="aboutContainer">
              <Row>
                <Col>
                  <Image
                    className="thumbnail"
                    src={header_image} 
                  />
                </Col>
                <Col>
                  <h3>Current Price: {price_overview ? price_overview.final_formatted : "N/A"}</h3>
                  {price_overview &&
                  <div>
                    <h3>Discount: {price_overview.discount_percent}%</h3>
                    <h3>Was Previously: {price_overview.initial_formatted}</h3>
                  </div>
                  }
                </Col>
              </Row>
              <hr></hr>
              <h3>About:</h3>
              <p dangerouslySetInnerHTML={{__html: about_the_game}} />
            </Tab>
            <Tab eventKey="reviews" title="Reviews" className="reviewContainer">
              <Review
                key = {"review" + steam_appid} 
                review_desc = {review.query_summary ?
                               review.query_summary.review_score_desc :
                               "N/A"
                              }
                top_reviews = {review.reviews ?
                               review.reviews :
                               ["N/A"]
                              }
              />
            </Tab>
            <Tab eventKey="details" title="Details" className="detailsContainer">
              <Row>
                <Col>
                  <h3>Age Rating: {required_age}</h3>
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
            <Tab eventKey="screenshots" title="Screenshots" className="screenshotsContainer">
              <Screenshots images={screenshots}/>
            </Tab>
            <Tab eventKey="movies" title="Movies" className="moviesContainer">
              <Movies movies={movies} />
            </Tab>
          </Tabs>
        </Col>
        <Col>
          {type === "game" ? 
            <iframe
            className="playerChart"
            src={`https://steamdb.info/embed/?appid=${steam_appid}`} 
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
