import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/header/Header';
import Footer from './component/footer/Footer'
import Home from './page/home/Home'
import Quiz from './page/Quiz/Quiz'
import Result from './page/Result/Result'
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState("")
  const [questions, setQuestions] = useState()
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(0)

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    )
    setQuestions(data?.results)
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header/>

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
                name={name}
                questions={questions} 
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
                score={score} 
                setScore={setScore}
                time={time}
                setTime={setTime}
              />
            }
          />
        </Routes>


      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
