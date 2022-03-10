import { motion, AnimatePresence } from "framer-motion";
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
      <AnimatePresence>
        {feedback.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem
              key={item.id}
              item={item}
              handleDelete={handleDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

FeedbackList.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      rating: PropTypes.number,
      text: PropTypes.string,
    }).isRequired
  ),
  handleDelete: PropTypes.func.isRequired,
};

export default FeedbackList;
