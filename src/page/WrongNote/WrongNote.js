import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import AlertRetry from "../../component/dialog/AlertRetry";

import CategoryIcon from '@mui/icons-material/Category';
import TimerIcon from '@mui/icons-material/Timer';
import AddTaskIcon from '@mui/icons-material/AddTask';
import HomeIcon from '@mui/icons-material/Home';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ReplayIcon from '@mui/icons-material/Replay';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const WrongNote = ({ category, questions, wrongQuestions, setWrongQuestions, score, setScore, time, setTime }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://opentdb.com/api_category.php`).then((response) => {
      response.data.trivia_categories.unshift({id: "0", name: "Any Category"})
      category === 0 
        ? setCategoryName("Any Category")
        : setCategoryName(response.data.trivia_categories[category].name)
    });
  }, [category]);

  const formatedTime = () => {
    if(time < 60 && time < 9 ) return `00:0${time}`
    if(time < 60 && time > 9 ) return `00:${time}`
    let min = Math.floor(time / 60)
    let sec = time % 60
    if(min < 10) min = "0" + min
    if(sec < 10) sec = "0" + sec
    return `${min}:${sec}`
  }

  const onClickRetryDialog = () => {
    setIsOpen(true)
  }

  const handleGoHome = () => {
    setScore(0)
    setTime(0)
    setWrongQuestions([])
    navigate('/')
  }

  const handleGoResult = () => {
    navigate("/result");
  }

  return (
    <div className="bg-slate-100 h-auto min-h-screen w-screen place-content-center py-12 px-12">
      <AlertRetry isOpen={isOpen} setIsOpen={setIsOpen} setScore={setScore} setTime={setTime} setWrongQuestions={setWrongQuestions}/>

      <div className='font-sans font-bold text-4xl'>Wrong Note</div>
      
      <div className='mt-5'>

        <div className="flex justify-between">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="flex items-center text-sm text-gray-500">
              <CategoryIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
              {categoryName}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <TimerIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
              {formatedTime()}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <AddTaskIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
              {score} / 10
            </div>
          </div>

          <div className="space-x-2">
            <button
              type="button"
              onClick={handleGoHome}
              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <HomeIcon className="-ml-1 mr-2 text-gray-500" aria-hidden="true" />
              Go to Home
            </button>
            <button
              type="button"
              onClick={handleGoResult}
              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <StickyNote2Icon className="-ml-1 mr-2 text-gray-500" aria-hidden="true" />
              Go to Result
            </button>
            <button
              type="button"
              onClick={onClickRetryDialog}
              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ReplayIcon className="-ml-1 mr-2 text-gray-500" aria-hidden="true" />
              Retry
            </button>
          </div>
        </div>

        <div className='mt-10 space-y-16'>
          {
            wrongQuestions.length 
              ? (
                wrongQuestions.map((wrongQues) => (
                  <div key={wrongQues}>
                    <div className='font-sans text-base tracking-wide text-slate-500'>[ {questions[wrongQues].category} ]</div>
                    <div className='font-sans text-xl tracking-wide my-2'>{wrongQues + 1 }. {questions[wrongQues].question}</div>

                    <div className='mt-8 mb-5'>
                      <div className='text-indigo-500 text-lg'> Correct Answer</div>
                      <div className="text-slate-500 tracking-wide">{questions[wrongQues].correct_answer}</div>
                    </div>

                    <div className='text-rose-500'>Wrong Answer</div>
                    <ul className='pl-4 list-disc space-y-3'>
                      {
                        questions[wrongQues].incorrect_answers.map((answer) => (
                          <li key={answer} className="text-gray-400">
                            <div className="text-slate-500 tracking-wide">{answer} : Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                          </li>
                        ))
                      }
                    </ul> 

                    <hr className="mt-16 border-slate-300 w-3/4"/>
                  </div>
                ))
              )
              : (
                <div className='h-full w-full mt-60 flex justify-center items-center'>
                  <div className="font-sans text-4xl tracking-wider text-indigo-500 flex items-center">
                    You're Perfect
                    <ThumbUpAltIcon className="flex-shrink-0 ml-2 text-indigo-500" aria-hidden="true" />
                  </div>
                </div>
              )
          }
        </div>

      </div>
    </div>
  )
}

export default WrongNote