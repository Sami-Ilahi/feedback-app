import { FaTimes, FaEdit } from "react-icons/fa";
import PropTypes, { InferProps } from "prop-types";

import Card from "./shared/Card";

function FeedbackItem({
  item,
  handleDelete,
}: InferProps<typeof FeedbackItem.propTypes>) {
  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button onClick={() => handleDelete(item.id)} className='close'>
        <FaTimes color='purple' />
      </button>
      <div className='text-display'>{item.text}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rating: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default FeedbackItem;
