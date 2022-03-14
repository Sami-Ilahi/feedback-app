import { createContext, useState, useEffect } from "react";

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
  isLoading: boolean;
  deleteFeedback: (id: string) => void;
  addFeedback: ({}) => void /* eslint-disable-line */;
  editFeedback: (item: FeedbackItemType) => void;
  updateFeedback: (id: string, updItem: updatedFeedbackType) => void;
}

const FeedbackContext = createContext<feedbackContextType>({
  feedback: [],
  feedbackEdit: {
    item: {},
    edit: false,
  },
  isLoading: true,
  deleteFeedback: () => [],
  addFeedback: ({}) => [] /* eslint-disable-line */,
  editFeedback: ({}) => {} /* eslint-disable-line */,
  updateFeedback: () => {},
});

export const FeedbackProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackItemType[]>([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  //fetch feedback from json server
  const fetchFeedback = async () => {
    const response = await fetch(
      `https://feedback-app-backend-api.herokuapp.com/feedback?_sort=id&_order=desc`
    );
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  // Add feedback
  const addFeedback = async (newFeedback: any) => {
    const response = await fetch(
      "https://feedback-app-backend-api.herokuapp.com/feedback",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedback),
      }
    );

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  // Delete feedback
  const deleteFeedback = async (id: number | string) => {
    if (window.confirm("Are you sure to delete?")) {
      await fetch(
        `https://feedback-app-backend-api.herokuapp.com/feedback/${id}`,
        { method: "DELETE" }
      );

      setFeedback(feedback.filter((item: FeedbackItemType) => item.id !== id));
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
  const updateFeedback = async (id: string, updItem: updatedFeedbackType) => {
    const response = await fetch(
      `https://feedback-app-backend-api.herokuapp.com/feedback/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updItem),
      }
    );

    const data = await response.json();
    setFeedback(feedback.map(item => (item.id === id ? data : item)));

    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
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
