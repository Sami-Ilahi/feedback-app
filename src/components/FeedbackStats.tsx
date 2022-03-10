import PropTypes, { InferProps } from "prop-types";

function FeedbackStats({
  feedback,
}: InferProps<typeof FeedbackStats.propTypes>) {
  // Calculate ratings avg
  const average = Math.round(
    feedback.reduce((acc, { rating }) => {
      return acc + rating;
    }, 0) / feedback.length
  );

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average} </h4>
    </div>
  );
}

FeedbackStats.propTypes = {
  feedback: PropTypes.array.isRequired,
};
export default FeedbackStats;
