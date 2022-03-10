import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";

interface newFeedbackType {
  rating: number;
  text: string;
  id: string;
}
interface idType {
  id?: number;
}

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const addFeedback = (newFeedback: newFeedbackType) => {
    newFeedback.id = uuidv4();

    setFeedback([newFeedback, ...feedback]);
  };
  const handleDelete = (id: idType) => {
    if (window.confirm("Are you sure to delete?")) {
      setFeedback(feedback.filter(item => item.id !== id));
    }
  };
  return (
    <Router>
      <Header />

      <div className='container'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <FeedbackForm handleAdd={addFeedback} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList feedback={feedback} handleDelete={handleDelete} />
              </>
            }
          ></Route>

          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
