import { Carousel } from 'react-bootstrap';

export default function Screenshots(props) {
  const { images } = props;
  
  return (
    <div className="screenshotsContainer">
      <h4>Screenshots</h4>
      <Carousel>
        {images && images.map((image) => (
          <Carousel.Item>
          <img
            className="d-block w-100"
            src={image.path_full}
            alt={"Screenshot number: " + image.id}
          />
        </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
