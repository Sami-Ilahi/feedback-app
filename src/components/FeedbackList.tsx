import PropTypes, { InferProps } from "prop-types";
import FeedbackItem from "./FeedbackItem";

function FeedbackList({
  feedback,
  handleDelete,
}: InferProps<typeof FeedbackList.propTypes>) {
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>;
  }
  return (
    <div className='feedback-list'>
      {feedback.map(item => (
        <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
      ))}
    </div>
  );
}

FeedbackList.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      rating: PropTypes.number,
      text: PropTypes.string,
    }).isRequired
  ),
  handleDelete: PropTypes.func.isRequired,
};

export default FeedbackList;
