import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Chart from '../../component/chart/Chart'
import AlertRetry from '../../component/dialog/AlertRetry'
import HomeIcon from '@mui/icons-material/Home';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ReplayIcon from '@mui/icons-material/Replay';

const Result = ({ 
    name, 
    questions, 
    score, 
    setScore, 
    time, 
    setTime, 
    setWrongQuestions,
    setShowStopWatch
  }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if(!name) navigate('/')
  }, [name, navigate])

  const handleGoHome = () => {
    setScore(0)
    setTime(0)
    setShowStopWatch(false)
    navigate('/')
  }

  const onClickRetryDialog = () => {
    setIsOpen(true)
  }

  const handleGoWrongNote = () => {
    navigate('/wrong-note')
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

  if(!questions) questions = []

  return (
    <div div className="bg-slate-100 h-screen w-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full">

        <AlertRetry isOpen={isOpen} setIsOpen={setIsOpen} setScore={setScore} setTime={setTime} setWrongQuestions={setWrongQuestions}/>

        <div className="text-center mb-16">
          <div className="font-medium font-sans text-5xl">Conguratulation,</div>
          <div className="font-sans font-medium text-2xl my-4">{name}</div>
        </div>

        <div className="bg-white shadow-md rounded-md py-4 px-6 mb-5">
          <div className="text-center mb-2 font-sans">Score</div>
          <div className="flex justify-center mt-8">
            <Chart score={score} worngScore={questions.length - score} />
          </div>
          <div className="flex justify-between">
            <div>
              <span className="text-xs mr-2">Correct Answer :</span> 
              <span className="font-medium text-sm">{score}</span>
            </div>
            <div>
              <span className="text-xs mr-2">Wrong Answer :</span> 
              <span className="font-medium text-sm">{questions.length - score}</span>
            </div>
          </div>
        </div>


        <div className="bg-white shadow-md rounded-md py-4 text-center mb-16">
          <div className="mb-2 font-sans">Total Elapsed Time</div>
          <div className="font-sans text-indigo-500 font-semibold">{formatedTime()}</div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleGoHome}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <HomeIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Go to Home
          </button>
          <button
            type="button"
            onClick={handleGoWrongNote}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <DriveFileRenameOutlineIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Wrong Note
          </button>
          <button
            type="button"
            onClick={onClickRetryDialog}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ReplayIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Retry
          </button>
        </div>
        

      </div>
    </div>
  )
}

export default Result