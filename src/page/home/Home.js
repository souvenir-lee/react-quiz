import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ErrorMessage from '../../component/errorMessage/ErrorMessage'
import { Button, MenuItem, TextField } from "@mui/material"
import axios from "axios"
import "./Home.css"

const Home = ({ name, setName, fetchQuestions }) => {
  const [categoryOptions, setCategoryOptions] = useState("")
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((response) => {
      response.data.trivia_categories.unshift({id: "0", name: "Any Category"})
      setCategoryOptions(response.data.trivia_categories);
    });
  }, []);
  
  if (!categoryOptions.length) return null

  const handleSubmit = () => {
    if(!category || !difficulty || !name) {
      setError(true)
      return
    } else {
      setError(false)
      fetchQuestions(category, difficulty)
      navigate('/quiz')
    }
  }

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>

        <div className="settings_select">
          {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage> }

          <TextField 
            style={{ marginBottom: 25}} 
            label="Enter your Name" 
            variant="outlined" 
            onChange={e => setName(e.target.value)}
          />
          <TextField
            select
            style={{ marginBottom: 30}} 
            label="Select Category"
            variant="outlined" 
            onChange={e => setCategory(e.target.value)}
            value={category}
          >
            { 
              categoryOptions.map(v => (
                <MenuItem key={v.name} value={v.id.toString()}>
                  {v.name}
                </MenuItem>
              )) 
            }
          </TextField>

          <TextField
            select
            style={{ marginBottom: 30}} 
            label="Select Difficulty"
            variant="outlined" 
            onChange={e => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <MenuItem key="Easy" value="easy">Easy</MenuItem>
            <MenuItem key="Medium" value="medium">Medium</MenuItem>
            <MenuItem key="Hard" value="hard">Hard</MenuItem>
          </TextField>

          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>

      </div>
      {/* <img src="/quiz.svg" className="banner" alt="quiz img"/> */}
    </div>
  )
}

export default Home