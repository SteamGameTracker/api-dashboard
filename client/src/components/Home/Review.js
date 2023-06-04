
export default function Review(props) {
  const { top_reviews, review_desc} = props;

  console.log(top_reviews[0]);

  return (
    <div>
      <h3>Rating: {review_desc}</h3>
      <h4>Top 20 reviews:</h4>
      {top_reviews.map((review) => (
        <div>
          <h4>Rating: {review.voted_up ? "Recommended" : "Not Recommended"}</h4>
          <h4>Review:</h4>
          <p>{review.review}</p>
        </div>
      ))}
    </div>
  )
}
