import React from "react";
import { Link } from "react-router-dom";

const ShowQuizId = () => {
  console.log(localStorage.getItem("quizId"));
  const quizId = localStorage.getItem("quizId").replaceAll('"', "");
  return (
    <div className="showQuizId">
      <div>
        <div>Your Generated Quiz ID : {quizId}</div>
        <p>
          Quiz Link :{" "}
          <Link to={"/playQuiz/" + { quizId }} state={quizId} target="_blank">
            http://localhost:3000/createQuiz/{quizId}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ShowQuizId;
