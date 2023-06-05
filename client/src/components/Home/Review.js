import SingleReview from "./SingleReview";

export default function Review(props) {
  const { top_reviews, review_desc} = props;

  return (
    <div>
      <h3>Rating: {review_desc}</h3>
      <h4>Top 20 reviews:</h4>
      <div>
        {top_reviews.map((review, index) => ( 
          <SingleReview
            key = {index}
            review = {review} />
        ))}
      </div>
    </div>
  );
}
