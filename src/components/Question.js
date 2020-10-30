import React, { useEffect, useState } from 'react'
import RadioButton from './RadioButton'

const Question = ({ currentQuestion, currentRound, shuffleData, nextQuestion, questionAnswered, setQuestionAnswered, updatePlayerScore, updatePlayersList }) => {
  const [radioButtons, setRadioButtons] = useState([])
  const [userAnswer, setUserAnswer] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')

  const handleUserAnswer = (e) => {
    setUserAnswer(e.target.value)
  }

  useEffect(() => {
    let unshuffledAnswers = [...currentQuestion.incorrect, currentQuestion.correct]
    let shuffledAnswers = shuffleData(unshuffledAnswers)
    setRadioButtons(shuffledAnswers.map((answer, key) => (
      <RadioButton key={key} index={key} answer={answer} handleUserAnswer={handleUserAnswer} />
    )))
  }, [currentQuestion])

  const validateAnswers = (e, userAnswer, correctAnswer) => {
    e.preventDefault()
    if (userAnswer === correctAnswer) {
      setQuestionAnswered(true)
      setCorrectAnswer(true)
      updatePlayerScore()
    } else {
      setQuestionAnswered(true)
      setCorrectAnswer(false)
    }
    if (currentRound === 9) {
      updatePlayersList()
    }
  }

  let questionDisplay = 
  !questionAnswered ?
    <div>
      <h1>Question {currentRound + 1}</h1>
      <p>{currentQuestion.question}</p>
      <form onSubmit={(e) => validateAnswers(e, userAnswer, currentQuestion.correct)}>
        {radioButtons}
        <button>Submit Answer</button>
      </form>
    </div>
  :
    <div>
      <h1>Question {currentRound + 1}</h1>
      <p>{currentQuestion.question}</p>
      <form onSubmit={nextQuestion}>
        {radioButtons}
        <button>Next Question</button>
      </form>
      <p>{correctAnswer ? 'Correct!' : `Incorrect. The correct answer was ${currentQuestion.correct}.`}</p>
    </div>

  return (
    questionDisplay
  )
}

export default Question