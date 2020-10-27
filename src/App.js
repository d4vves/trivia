import { useState } from 'react';
import triviaData from './lib/Apprentice_TandemFor400_Data.json'
import Question from './Question'
import './App.css';

function App() {
  const [triviaGame, setTriviaGame] = useState('')
  const [round, setRound] = useState('')
  let currentQuestion = triviaGame[round]

  const shuffleQuestions = (data) => {
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
    let newGame = shuffleQuestions(triviaData)
    setTriviaGame(newGame.slice(0, 10))
    setRound(0)
  }

  const changeQuestion = (e) => {
    e.preventDefault()
    setRound(round + 1)
  }

  switch(round) {
    case 0:
      return (
        <Question currentQuestion={currentQuestion} round={round} changeQuestion={changeQuestion} />
      )
    case 1:
      return (
        <Question currentQuestion={currentQuestion} round={round} changeQuestion={changeQuestion} />
      )
    case 2:
      return (
        <Question currentQuestion={currentQuestion} round={round} changeQuestion={changeQuestion} />
      )
    case 3:
      return (
        <Question currentQuestion={currentQuestion} round={round} changeQuestion={changeQuestion} />
      )

    case 4:
      return (
        <Question currentQuestion={currentQuestion} round={round} changeQuestion={changeQuestion} />
      )
    case 5:
      return (
        <Question currentQuestion={currentQuestion} round={round} changeQuestion={changeQuestion} />
      )
    case 6:
      return (
        <Question currentQuestion={currentQuestion} round={round} changeQuestion={changeQuestion} />
      )
    case 7:
      return (
        <Question currentQuestion={currentQuestion} round={round} changeQuestion={changeQuestion} />
      )
    case 8:
      return (
        <Question currentQuestion={currentQuestion} round={round} changeQuestion={changeQuestion} />
      )
    case 9:
      return (
        <Question currentQuestion={currentQuestion} round={round} changeQuestion={changeQuestion} />
      )
    default:
      return (
        <div>
          <h1>Tandem Trivia!</h1>
          <form onSubmit={getTriviaGame}>
            <button>Begin</button>
          </form>
        </div>
      )
  }

}

export default App
