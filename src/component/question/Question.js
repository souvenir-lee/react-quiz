import { useState } from "react"
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage"
import { Button } from '@mui/material';
import "./Question.css"

const Question = ({
  currQuestion, 
  questions, 
  options, 
  correct, 
  score, 
  setCurrQuestion, 
  setScore
}) => {
  const [selected, setSelected] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()

  const handleSelect = (i) => {
    if(selected === i && selected === correct) return 'select'
    else if(selected === i && selected !== correct) return 'wrong'
    else if(i === correct) return 'select'
  }

  const handleCheck = (i) => {
    setSelected(i)
    console.log('handleCheck i :>>',i)
    if(i === correct) setScore(score+1)
    setError(false)
  }

  const handleQuit = () => {
    if(currQuestion > 8) navigate('/result')
    else if(selected) {
      setCurrQuestion(currQuestion + 1)
      setSelected()
    }
    else setError("Please select an answer first")
  }

  const handleNext = () => {
    if (currQuestion > 8) {
      navigate("/result");
    } else if (selected) {
      setCurrQuestion(currQuestion + 1);
      setSelected();
    } else setError("Please select an option first");
  }
  
  return (
    <div className="question">
      <h1>Quesiton { currQuestion + 1 }</h1>

      <div className="singleQuestion">
        <h2>{questions[currQuestion].question}</h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {
            options && 
            options.map(i => (
              <button 
                onClick={() => handleCheck(i)}
                className={`singleOption ${selected && handleSelect(i)}`}
                key={i}
                disabled={selected}
              >
                {i}
              </button>
            ))
          }
        </div> 

        <div className="controls">
          <Button 
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={handleQuit}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="success"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            Next Question
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Question