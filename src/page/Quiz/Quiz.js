import { useEffect, useState } from "react"
import Question from "../../component/question/Question";
import StopWatch from "../../component/stopWatch/StopWatch";
import { CircularProgress } from '@mui/material';
import "./Quiz.css"

const Quiz = ({ name, questions, score, setScore, time, setTime}) => {
  const [options, setOptions] = useState()
  const [currQuestion, setCurrQuestion] = useState(0)
  
  useEffect(() => {
    console.log('questions :>>', questions)
    setOptions(questions && handleShuffle([
      questions[currQuestion]?.correct_answer, 
      ...questions[currQuestion]?.incorrect_answers
    ]))
  }, [questions, currQuestion])

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5)
  }
  
  console.log(options)
  
  return (
    <div className="quiz"> 
      <span className="subtitle"> Welcome, {name} </span>
      {
        questions 
          ? (
            <>
              <div className="quizInfo">
                <span>{questions[currQuestion].category}</span>
                <StopWatch time={time} setTime={setTime} />
                <span>Score : {score}/{questions.length} </span>
              </div>

              <Question
                currQuestion={currQuestion}
                questions={questions}
                options={options}
                correct={questions[currQuestion]?.correct_answer}
                score={score}
                setCurrQuestion={setCurrQuestion}
                setScore={setScore}
              />

            </> 
          )
          : <CircularProgress 
            style={{ margin: 100 }} 
            color="inherit" 
            size={150} 
            thickness={1} 
          />
      }
    </div>
  )
}

export default Quiz