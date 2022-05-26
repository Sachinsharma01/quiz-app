import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  generateSixCharacterAlphaNumericPermaLink,
  getAllInputs,
  uploadQuizDetailsInFirebase,
  uploadQuizIdToUserDetailsInFirebase,
} from "../helpers/getUserQuizIds";

const AddQuestionComponent = ({ totalQuestions }) => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [question, setQuestion] = useState();

  const [options, setOptions] = useState(0);
  const [allOptions, setAllOptions] = useState([]);
  const [singleOption, setSingleOption] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [quiz, setQuiz] = useState([]);

  const history = useHistory();

  const nextClickHandler = () => {
    setQuestion("");
    setOptions("");
    setSingleOption("");
    setAllOptions([]);
    setCorrectOption("");

    setQuestionNumber((previousValue) => previousValue + 1);

    setQuiz([
      ...quiz,
      {
        question: question,
        options: allOptions,
        answer: correctOption,
      },
    ]);
  };
  // console.log(questions);
  console.log(quiz);

  const singleQuestionHandler = (event) => {
    setSingleOption(event.target.value);
  };

  const saveSingleOptionHandler = () => {
    setAllOptions([...allOptions, singleOption]);
  };

  const saveQuizHandler = () => {
    const quizId = generateSixCharacterAlphaNumericPermaLink();
    console.log(quizId);
 
    localStorage.setItem("quiz", JSON.stringify(quiz));
    localStorage.setItem("quizId", JSON.stringify(quizId));
    console.log(quiz);

    uploadQuizDetailsInFirebase(quiz);
    uploadQuizIdToUserDetailsInFirebase();
    history.replace("/createQuiz/showQuizId");
  };

  const optionsArray = getAllInputs(
    options,
    singleQuestionHandler,
    saveSingleOptionHandler
  );

  return (
    <>
      <div>
        <div>
          <label>Question {questionNumber}</label>
          <textarea
            className="inputTextArea"
            required
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            placeholder={`ENTER QUESTION ${questionNumber}`}
          />
        </div>
        <div className="options">
          <label>
            Options
            <select
              value={options}
              onChange={(e) => setOptions(e.target.value)}
              className="inputBox selectOptions"
            >
              <option value="0" key="0">
                select
              </option>
              <option value="2" key="2">
                2
              </option>
              <option value="3" key="3">
                3
              </option>
              <option value="4" key="4">
                4
              </option>
              <option value="5" key="5">
                5
              </option>
            </select>
          </label>
        </div>
        <div className="allOptions">
          {optionsArray.map((option, idx) => (
            <div key={idx}>{option}</div>
          ))}
        </div>
        <div className="correctOption">
          <input
            type="text"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            required
            placeholder="CORRECT OPTION"
            className="inputBox"
          />
          <br />
          <small>Please Enter the Correct value</small>
        </div>
        <button
          className={
            question && questionNumber !== totalQuestions
              ? "btn nextBtn"
              : "btn inactive"
          }
          onClick={nextClickHandler}
        >
          NEXT
        </button>
        <button type="submit" onClick={saveQuizHandler} className="btn saveBtn">
          SAVE
        </button>
      </div>
    </>
  );
};

export default AddQuestionComponent;
