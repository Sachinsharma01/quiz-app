import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Home = () => {
  const [quizes, setQuizes] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await getDocs(collection(db, "quizes"));
      let data = [];
      response.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().questions[0]}`);
        // console.log(doc.data());
        data.push(doc.data());
      });
      // console.log(data)
      setQuizes(data)
    };
    // console.log(quizes);
    getData();
  }, []);
  console.log(quizes)

  return (
    <>
      <div className="mainWrapper">
        <section className="main">
          <h2>Welcome Back </h2>
          <Link to="/create" target="_blank" className="btn createBtn">
            Create Quiz
          </Link>
        </section>

        <section className="allQuizes">
          <div className="allQuizesHeading">
            <h2>All QUIZZEZ</h2>
          </div>
          <section className="allQuizesList">
            {
              quizes.map((quiz, idx) => <QuizCard key={idx} title={quiz.title} />)
              
            }
          </section>
        </section>
      </div>
    </>
  );
};

export default Home;
