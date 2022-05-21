import React from "react";

const QuizCard = ({title}) => {
  console.log(title)
  return (
    <div className="card">
      <h2 className="quizTitle">{title}</h2>
      <div className="deleteQuiz">
        <button className="btn deleteBtn">Delete Quiz</button>
      </div>
    </div>
  );
};

export default QuizCard;
