import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../firebase/firebase";

const QuizCard = ({ title, id }) => {
  console.log(id);
  const userName = localStorage.getItem("userName");
  const deleteJobHandler = async () => {
    await deleteDoc(doc(db, "quizes", id + ""));
    const dbRef = doc(db, "users", userName);
    await updateDoc(dbRef, {
      quizIDs: arrayRemove(id),
    });
    window.location.reload("/");
  };
  // console.log(title)
  return (
    <div className="card">
      <h2 className="quizTitle">{title}</h2>
      <div className="deleteQuiz">
        <button className="btn deleteBtn" onClick={deleteJobHandler}>
          Delete Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
