import React, { useState } from "react";
import { Link } from "react-router-dom";

const PlayQuiz = () => {
  const [quiz, setQuiz] = useState(JSON.parse(localStorage.getItem("quiz")));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userChosenOption, setUserChosenOption] = useState("");
  const [score, setScore] = useState(0);

  const userChoiceOptionHandler = (event) => {
    setUserChosenOption(event.target.value);
    playQuizNexButtonHandler();
  };
  const playQuizNexButtonHandler = () => {
    if (userChosenOption === quiz[questionIndex].answer) {
      setScore((previouscore) => previouscore + 1);
    }
    setQuestionIndex((previousQuizIndex) => previousQuizIndex + 1);
  };

  const length = quiz.length;
  console.log(quiz);
  return (
    <>
      <div className="playQuizWrapper">
        <div className="questions">
          {questionIndex === length ? (
            <div>
              <h1>Your Score {score} </h1>
              <Link className="btn nextBtn" to="/">
                Home
              </Link>
            </div>
          ) : (
            <>
              <div className="displayQuestion">
                <div className="questionLabel">
                  <label>Q{questionIndex + 1}.</label>
                </div>
                <textarea
                  className="playQuizDisplayQuestion"
                  readOnly
                  value={quiz[questionIndex].question}
                ></textarea>
                </div>
                {quiz[questionIndex].isMultipleChoice && (
                  <small className="information">This Question is a multiple choice question</small>
                )}
              <div className="playQuizAllOptions">
                <div className="playQuizAllOptions">
                  {quiz[questionIndex].options.map((option) => (
                    <input
                      key={Math.random()}
                      readOnly
                      onClick={userChoiceOptionHandler}
                      onChange={() => {}}
                      className="btn optionBtn "
                      value={`${option}`}
                    />
                  ))}
                </div>
              </div>
              {
                // <button
                //   onClick={playQuizNexButtonHandler}
                //   className="btn nextBtn"
                // >
                //   NEXT
                // </button>
              }
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayQuiz;
