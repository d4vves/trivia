import { useEffect, useState } from 'react';
import Start from './components/Start'
import Question from './components/Question'
import './App.css';

function App() {
  const [triviaGame, setTriviaGame] = useState('')
  const [currentRound, setCurrentRound] = useState(null)
  const [questionAnswered, setQuestionAnswered] = useState(false)
  const [playersList, setPlayersList] = useState(() => JSON.parse(window.localStorage.getItem('playersList')) || [])
  const [currentPlayer, setCurrentPlayer] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState('')

  const getTriviaGame = (e) => {
    e.preventDefault()
    setTriviaGame('')
    setCurrentQuestion('')
    setCurrentRound(null)
    fetch('https://opentdb.com/api.php?amount=10')
      .then(response => response.json())
      .then(json => {
        let newGame = json.results
        setTriviaGame(newGame)
        setCurrentQuestion(newGame[0])
      })
      .catch(error => console.error('Oops!', error))
    setCurrentRound(0)
  }

  const nextQuestion = (e) => {
    e.preventDefault()
    setCurrentRound(prevRound => prevRound + 1)
    setCurrentQuestion(triviaGame[currentRound + 1])
    setQuestionAnswered(false)
  }

  const handleNameChange = (e) => {
    setCurrentPlayer({
      name: e.target.value,
      score: 0
    })
  }

  const updatePlayerScore = (shouldUpdate) => {
    if (!shouldUpdate) return
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

  const isGameInProgress = currentRound < 10 && currentRound != null

  const config = {
    currentQuestion,
    currentRound,
    nextQuestion,
    questionAnswered,
    setQuestionAnswered,
    updatePlayerScore,
    updatePlayersList,
  }

  let gameDisplay = 
     isGameInProgress?
      <Question 
        config={config}
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