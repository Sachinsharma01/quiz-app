import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const QuizData = createContext();

const ContextProvider = ({ children }) => {
  const [allQuizIds, setAllQuizIds] = useState();
  const [allUsers, setAllUsers] = useState();
  useEffect(() => {
    async function getAllQuizIdsFromFirebase() {
      const response = await getDocs(collection(db, "quizes"));

      var quizIds = {};
      response.forEach((doc) => {
        quizIds = {
          ...quizIds,
          [doc.id]: doc.data(),
        };
      });
      setAllQuizIds(quizIds);
    }

    async function getAllUsersFromFirebase() {
      const response = await getDocs(collection(db, "users"));

      var users = {};
      response.forEach((doc) => {
        users = {
          ...users,
          [doc.id]: doc.data(),
        };
      });
      setAllUsers(users);
    }
    getAllQuizIdsFromFirebase();
    getAllUsersFromFirebase();
  }, []);

  // console.log(allQuizIds);
  localStorage.setItem('allUsers', JSON.stringify(allUsers))
  // console.log(allUsers);

  return (
    <QuizData.Provider value={{ allQuizIds, allUsers }}>
      {children}
    </QuizData.Provider>
  );
};

export { ContextProvider, QuizData };
