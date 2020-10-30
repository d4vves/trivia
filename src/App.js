import { useEffect, useState } from 'react';
import triviaData from './lib/Apprentice_TandemFor400_Data.json'
import Start from './components/Start'
import Question from './components/Question'
import shuffleData from './hooks/shuffleData'
import './App.css';

function App() {
  const [triviaGame, setTriviaGame] = useState('')
  const [currentRound, setCurrentRound] = useState(null)
  const [questionAnswered, setQuestionAnswered] = useState(false)
  const [playersList, setPlayersList] = useState(() => JSON.parse(window.localStorage.getItem('playersList')) || [])
  const [currentPlayer, setCurrentPlayer] = useState({})
  let currentQuestion = triviaGame[currentRound]

  const getTriviaGame = (e) => {
    e.preventDefault()
    let newGame = shuffleData(triviaData)
    setTriviaGame(newGame.slice(0, 10))
    setCurrentRound(0)
  }

  const nextQuestion = (e) => {
    e.preventDefault()
    setCurrentRound(currentRound + 1)
    setQuestionAnswered(false)
  }

  const handleNameChange = (e) => {
    setCurrentPlayer({
      name: e.target.value,
      score: 0
    })
  }

  const updatePlayerScore = () => {
    currentPlayer.score++
    setCurrentPlayer(currentPlayer)
  }

  const updatePlayersList = () => {
    let updatedList = [...playersList]
    let filteredList = updatedList.filter(player => player.name === currentPlayer.name)
    if (filteredList.length > 0) {
      filteredList[0].score += currentPlayer.score
      setPlayersList(updatedList)
    } else {
      setPlayersList([currentPlayer, ...updatedList])
    }
  }

  useEffect(() => {
    window.localStorage.setItem('playersList', JSON.stringify(playersList))
  }, [playersList])

  let gameDisplay = 
    currentRound < 10 && currentRound != null ?
      <Question 
        currentQuestion={currentQuestion}
        currentRound={currentRound}
        shuffleData={shuffleData}
        nextQuestion={nextQuestion}
        questionAnswered={questionAnswered}
        setQuestionAnswered={setQuestionAnswered}
        updatePlayerScore={updatePlayerScore}
        updatePlayersList={updatePlayersList}
      />
    :
      <Start
        getTriviaGame={getTriviaGame}
        handleNameChange={handleNameChange}
        playersList={playersList}
      />

  return (
    gameDisplay
  )
}

export default App