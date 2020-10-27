import { useState } from 'react';
import triviaData from './lib/Apprentice_TandemFor400_Data.json'
import Question from './Question'
import './App.css';

function App() {
  const [triviaGame, setTriviaGame] = useState('')
  const [currentRound, setCurrentRound] = useState(null)
  let currentQuestion = triviaGame[currentRound]

  const shuffleData = (data) => {
    let current = data.length
    let random
    let temp
    while (current) {
      random = Math.floor(Math.random() * current--)
      temp = data[current]
      data[current] = data[random]
      data[random] = temp
    }
    return data
  }

  const getTriviaGame = (e) => {
    e.preventDefault()
    let newGame = shuffleData(triviaData)
    setTriviaGame(newGame.slice(0, 10))
    setCurrentRound(0)
  }

  const advanceRound = (e) => {
    e.preventDefault()
    setCurrentRound(currentRound + 1)
  }

  let currentDisplay = 
    currentRound < 10 && currentRound != null ?
      <Question 
        currentQuestion={currentQuestion}
        currentRound={currentRound}
        advanceRound={advanceRound}
        shuffleData={shuffleData}
      />
    :
      <div>
        <h1>Tandem Trivia!</h1>
        <form onSubmit={getTriviaGame}>
          <button>Begin</button>
        </form>
      </div>

  return (
    currentDisplay
  )
}

export default App