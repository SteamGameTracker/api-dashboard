export default function SingleReview(props) {
  const { review } = props;

  return (
    <div className="singleReview">
      <h4>Rating: {review.voted_up ? "Recommended" : "Not Recommended"}</h4>
      <h4>Review:</h4>
      <hr></hr>
      <p>{review.review && review.review.split('\n').map(str => <p>{str}</p>)}</p>
    </div>
  );
}
