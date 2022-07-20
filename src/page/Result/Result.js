import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import "./Result.css"

const Result = ({ name, questions, score, setScore, time, setTime }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!name) navigate('/')
  }, [name, navigate])

  const handleGoHome = () => {
    setScore(0)
    setTime(0)
    navigate('/')
  }

  const formatedTime = () => {
    if(time < 60 && time < 9 ) return `00:0${time}`
    if(time < 60 && time > 9 ) return `00:${time}`
    let min = Math.floor(time / 60)
    let sec = time % 60
    if(min < 10) min = "0" + min
    if(sec < 10) sec = "0" + sec
    return `${min}:${sec}`
  }

  return (
    <div className="result">
      <span className="title">Final Score : {score}</span>
      <span className="title">Wrong Answer : { questions.length - score}</span>
      <span> Total Elapsed Time : {formatedTime()} </span>

      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20}}
        herf="/"
        onClick={handleGoHome}
      >
        Go to Home
      </Button>
    </div>
  )
}

export default Result