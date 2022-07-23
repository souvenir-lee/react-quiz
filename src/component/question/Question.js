import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Question = ({
  currQuestion, 
  questions, 
  wrongQuestions,
  setWrongQuestions,
  options, 
  correct, 
  score, 
  setCurrQuestion, 
  setScore,
  selected,
  setSelected
}) => {
  const [isDisabled, setIsDisabled] = useState(false)
  const navigate = useNavigate()

  const handleSelect = (i) => {
    if(selected === i && selected === correct) {
      return 'bg-emerald-500 hover:bg-emerald-500 pointer-events-none'
    }
    else if(selected === i && selected !== correct) {
      return 'bg-rose-500 hover:bg-rose-500 pointer-events-none'
    }
    else if(i === correct) {
      return 'bg-emerald-500 hover:bg-emerald-500 pointer-events-none'
    }
  }

  const handleCheck = (i, e) => {
    console.log('handleCheck i :>>',i)
    e.stopPropagation();
    (i === correct) ? setScore(score+1) : setWrongQuestions([...wrongQuestions, currQuestion])
    setSelected(i)
    setIsDisabled(true)
    return
  }

  const handleNext = (event) => {
    event.preventDefault();

    if (currQuestion > 8) {
      console.log('1')
      navigate("/result");
    } else if (selected) {
      console.log('2')
      setCurrQuestion(currQuestion + 1);
      setSelected();
    } else alert("Please select an option first");
  }
  
  return (
    <div className="flex items-center justify-center py-14 px-4">
      <div className="w-full">
        <div className="font-sans font-semibold tracking-wide">{ currQuestion + 1 }. {questions[currQuestion].question}</div>
        
        <form onSubmit={handleNext} action="#" method="POST">
          <div className="my-12 flex flex-wrap justify-center">
            {
              options && 
              options.map(i => (
                <div 
                  onClick={(e) => handleCheck(i, e)}
                  className={`text-center w-1/3 mr-6 mb-6 shadow-md bg-white py-4 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 ${selected && handleSelect(i)}`}
                  key={i}
                  disabled={isDisabled}
                >
                  {i}
                </div>
              ))
            }
          </div> 

          <div className="flex justify-center">
            <button
              type="submit"
              className="font-sans shadow-lg bg-indigo-500 border border-transparent rounded-md py-3 px-20 flex items-center justify-center text-xl tracking-wider text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Next
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Question