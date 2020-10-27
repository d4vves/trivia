import { useState } from 'react';
import triviaData from './lib/Apprentice_TandemFor400_Data.json'
import Question from './components/Question'
import shuffleData from './hooks/shuffleData'
import './App.css';

function App() {
  const [triviaGame, setTriviaGame] = useState('')
  const [currentRound, setCurrentRound] = useState(null)
  let currentQuestion = triviaGame[currentRound]

  const getTriviaGame = (e) => {
    e.preventDefault()
    let newGame = shuffleData(triviaData)
    setTriviaGame(newGame.slice(0, 10))
    setCurrentRound(0)
  }

  let currentDisplay = 
    currentRound < 10 && currentRound != null ?
      <Question 
        currentQuestion={currentQuestion}
        currentRound={currentRound}
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