import { Carousel } from 'react-bootstrap';

export default function Movies(props) {
  const { movies } = props;
  
  return (
    <div className="moviesContainer">
      <h4>Videos</h4>
      <Carousel controls={null} interval={null}>
        {movies && movies.map((movie) => (
          <Carousel.Item>
            <iframe
            className="d-block w-100"
            src={movie.mp4.max} 
            height={400}
            width={600}
            loading={'lazy'}
            title={movie.name}
            />
        </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
