import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";

// interface newFeedbackType {
//   rating: number;
//   text: string;
//   id: string;
// }
interface idType {
  id?: number;
}

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const addFeedback = (newFeedback: any) => {
    newFeedback.id = uuidv4;
    console.log(newFeedback);
  };
  const handleDelete = (id: idType) => {
    console.log(typeof id);
    if (window.confirm("Are you sure to delete?")) {
      setFeedback(feedback.filter(item => item.id !== id));
    }
  };
  return (
    <>
      <Header />
      <div className='container'>
        <FeedbackForm handleAdd={addFeedback} />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={handleDelete} />
      </div>
    </>
  );
}

export default App;
