import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Home = ({ name, setName, fetchQuestions }) => {
  const [categoryOptions, setCategoryOptions] = useState("")
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [showStopWatch, setShowStopWatch] = useState(false);
  
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((response) => {
      response.data.trivia_categories.unshift({id: "0", name: "Any Category"})
      setCategory("0")
      setDifficulty("easy")
      setCategoryOptions(response.data.trivia_categories);
    });
  }, []);
  
  if (!categoryOptions.length) return null

  const handleSubmit = (event) => {
    console.log('click')
    event.preventDefault();

    if(!category || !difficulty || !name) {
      console.log('???', category, difficulty, name)
      return
    } else {
      console.log(category, difficulty, name)
      fetchQuestions(category, difficulty)
      navigate('/quiz')
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center py-14 px-4 sm:px-6 lg:px-8">
      <img src="/background.webp" className="absolute -left-60 -bottom-6" alt="background" width="800" height="600"/>
      <div className="max-w-md w-full space-y-16">

        <div className="text-center font-sans text-6xl font-bold">React Quiz App</div>

        <form className="mt-8" onSubmit={handleSubmit} action="#" method="POST">

          {/* NAME */}
          <div className="my-5">
            <label htmlFor="user-name" className="block font-sans text-lg font-semibold">
              Name
            </label>
            <input
              id="user-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              onChange={e => setName(e.target.value)}
              className="font-sans mt-1 block w-full py-2 px-3 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
              placeholder="Your Name"
            />
          </div>

          {/* CATEGORY */}
          <div className="my-5">
            <label htmlFor="category" className="block font-sans text-lg font-semibold">
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                autoComplete="category"
                required
                onChange={e => setCategory(e.target.value)}
                className="font-sans appearance-none mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Select a Category"
                value={category}
              >
                {
                  categoryOptions.map(v => (
                    <option key={v.name} value={v.id.toString()}>
                      {v.name}
                    </option>
                  )) 
                }
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* DIFFICULTY */}
          <div className="my-5">
            <label htmlFor="difficulty" className="block font-sans text-lg font-semibold">
              Difficulty
            </label>
            <div className="relative">
              <select
                id="difficulty"
                name="difficulty"
                autoComplete="difficulty"
                required
                onChange={e => setDifficulty(e.target.value)}
                className="font-sans appearance-none mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Select a Category"
                value={difficulty}
              >
                <option key="Easy" value="easy">Easy</option>
                <option key="Medium" value="medium">Medium</option>
                <option key="Hard" value="hard">Hard</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Show Stop Watch */}
          <div className="my-8">
            <div className="flex justify-between items-center">
              <div className="block font-sans text-md">Show the Stop watch</div>
              <label htmlFor="check" className="shadow bg-indigo-100 cursor-pointer relative w-10 h-4 rounded-full">
                <input onClick={() => setShowStopWatch(!showStopWatch)} type="checkbox" id="check" className="sr-only peer"/>
                <span 
                  className="w-6 h-6 shadow bg-indigo-400 absolute rounded-full -left-1 -top-1 peer-checked:bg-indigo-700 peer-checked:left-5 transition-all duration-300"
                ></span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-14 font-sans shadow-lg w-full bg-indigo-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-xl font-semibold tracking-wider text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Game Start
          </button>
        </form>
          
        <div className="max-w-md w-full fixed bottom-4 flex justify-center">
          <span className="font-sans mr-2">Made by</span>
          <span className="font-sans font-bold">Han Seul Lee</span>
        </div>

      </div>
    </div>
  )
}

export default Home