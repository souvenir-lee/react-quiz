import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/home/Home'
import Quiz from './page/Quiz/Quiz'
import Result from './page/Result/Result'
import WrongNote from './page/WrongNote/WrongNote';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState("")
  const [questions, setQuestions] = useState()
  const [wrongQuestions, setWrongQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(0)
  const [category, setCategory] = useState("")

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&encode=base64`
    )
    data?.results.forEach(result => {
      // console.log('result :>>', result)
      result.category = atob(result.category)
      result.correct_answer = atob(result.correct_answer)
      result.incorrect_answers = result.incorrect_answers.map(v => v = atob(v))
      result.question = atob(result.question)
    })
    // console.log('before',data?.results)
    setCategory(category)
    setQuestions(data?.results)
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route 
            path="/" exact 
            element={
              <Home name={name} 
                setName={setName} 
                fetchQuestions={fetchQuestions} 
                />
            }
          />
          <Route path="/quiz" exact element={
              <Quiz 
                questions={questions} 
                wrongQuestions={wrongQuestions}
                setWrongQuestions={setWrongQuestions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                time={time}
                setTime={setTime}
              />
            }
          />
          <Route path="/result" exact element={
              <Result 
                name={name} 
                questions={questions} 
                setWrongQuestions={setWrongQuestions}
                score={score} 
                setScore={setScore}
                time={time}
                setTime={setTime}
              />
            }
          />
          <Route path="/wrong-note" exact element={
              <WrongNote 
                category={category}
                questions={questions} 
                wrongQuestions={wrongQuestions}
                setWrongQuestions={setWrongQuestions}
                score={score}
                setScore={setScore} 
                time={time}
                setTime={setTime}
              />
            }
          />
        </Routes>      
      </div>
    </BrowserRouter>
  );
}

export default App;
