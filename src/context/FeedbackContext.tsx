import { Item } from "framer-motion/types/components/Reorder/Item";
import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  children: JSX.Element | JSX.Element[];
}
interface updatedFeedbackType {
  text: string;
  rating: number;
}
interface FeedbackItemType {
  id: string;
  text: string;
  rating: number;
}

interface feedbackContextType {
  feedback: FeedbackItemType[];
  feedbackEdit: {
    item: {
      id?: string;
      text?: string;
      rating?: number;
    };
    edit: boolean;
  };
  deleteFeedback: (id: string) => void;
  addFeedback: ({}) => void;
  editFeedback: (item: FeedbackItemType) => void;
  updateFeedback: (id: string, updItem: updatedFeedbackType) => void;
}

const FeedbackContext = createContext<feedbackContextType>({
  feedback: [
    {
      id: "1",
      text: "this is a test from context 1",
      rating: 10,
    },
  ],
  feedbackEdit: {
    item: {},
    edit: false,
  },
  deleteFeedback: () => [],
  addFeedback: ({}) => [],
  editFeedback: ({}) => {},
  updateFeedback: () => {},
});

export const FeedbackProvider = ({ children }: Props) => {
  const [feedback, setFeedback] = useState([
    {
      id: "1",
      text: "this is a test from context 1",
      rating: 10,
    },
    {
      id: "155",
      text: "this is a test from context 2",
      rating: 3,
    },
    {
      id: "22225",
      text: "this is a test from context 3",
      rating: 5,
    },
  ]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // Add feedback
  const addFeedback = (newFeedback: any) => {
    newFeedback.id = uuidv4();
    console.log(newFeedback);
    setFeedback([newFeedback, ...feedback]);
  };

  // Delete feedback
  const deleteFeedback = (id: number | string) => {
    if (window.confirm("Are you sure to delete?")) {
      setFeedback(feedback.filter(item => item.id !== id));
    }
  };

  // Set item to be updated
  const editFeedback = (item: FeedbackItemType) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  // Update feedback item
  const updateFeedback = (id: string, updItem: updatedFeedbackType) => {
    setFeedback(
      feedback.map((item: FeedbackItemType) =>
        item.id === id ? { ...item, ...updItem } : item
      )
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
export default FeedbackContext;
