import { db } from "../firebase/firebase";
import { updateDoc, doc, setDoc } from "firebase/firestore";

export const getUserQuizIds = (allUsers) => {
  const userName = localStorage.getItem("userName");

  var response;

  if (allUsers !== null && allUsers !== undefined) {
    response = allUsers[userName].quizIDs;
  }
  return response;
};

export const getDataFromQuizIds = (quizIds, quizIdArray) => {
  var response = [];
  if (quizIdArray !== null && quizIdArray !== undefined) {
    quizIdArray.forEach((quizId) => {
      console.log(quizId);
      response.push(quizIds[quizId]);
    });
  }
  return response;
};

export const getFilteredDataArray = async (originalArray, id) => {
  const res = originalArray.filter((quizId) => {
    return quizId !== id;
  });
  console.log(res + " id : " + id);
  return res;
};

export const getAllInputs = (numberOfInputs, onChange, onBlur) => {
  var response = [];
  for (let i = 0; i < numberOfInputs; i++) {
    response.push(
      <input
        type="text"
        placeholder="OPTION"
        className="inputBox"
        required
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  }
  // console.log(response);
  return response;
};

export const generateSixCharacterAlphaNumericPermaLink = () => {
  const response = Math.random().toString(36).substr(2, 6);
  // console.log(response);
  return response;
};

export const uploadQuizDetailsInFirebase = async (quiz) => {
  const quizTitle = localStorage.getItem("quizTitle");
  const quizId = localStorage.getItem("quizId").replaceAll('"', "");
  quiz = { ...quiz, id: quizId, title: quizTitle };
  // console.log(quiz);
  await setDoc(doc(db, "quizes", quizId), quiz);
  console.log("updated");
};

export const uploadQuizIdToUserDetailsInFirebase = async () => {
  const userName = localStorage.getItem("userName");
  const quizId = localStorage.getItem("quizId").replaceAll('"', "");

  const allUsersData = JSON.parse(localStorage.getItem("allUsers"));

  var newUpdatedArray = allUsersData[userName].quizIDs;
  newUpdatedArray.push(quizId);
  const dbRef = doc(db, "users", userName);
  console.log(newUpdatedArray);

  await updateDoc(dbRef, {
    quizIDs: newUpdatedArray,
  });
  console.log("uploaded");
};

export const validateAnswers = (actualAnswers, userAnswers) => {
  let flag = 0;
  console.log(actualAnswers);
  console.log(userAnswers);
  for (let i = 0; i < actualAnswers.length; i++) {
    if (userAnswers.indexOf(actualAnswers[i]) !== -1) {
      flag++;
    }
  }
  return flag === actualAnswers.length;
};
