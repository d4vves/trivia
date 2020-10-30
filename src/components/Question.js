import React, { useEffect, useState } from 'react'
import RadioButton from './RadioButton'

const Question = ({ currentQuestion, currentRound, shuffleData, nextQuestion, questionAnswered, setQuestionAnswered, updatePlayerScore, updatePlayersList }) => {
  const [radioButtons, setRadioButtons] = useState([])
  const [answerPositions, setAnswerPositions] = useState([])
  const [userAnswer, setUserAnswer] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')

  const handleUserAnswer = (e) => {
    setUserAnswer(e.target.value)
  }

  useEffect(() => {
    let unshuffledAnswers = [...currentQuestion.incorrect, currentQuestion.correct]
    let shuffledAnswers = shuffleData(unshuffledAnswers)
    setAnswerPositions(shuffledAnswers)
    let enabledRadioButtons = shuffledAnswers.map((answer, key) => (
      <RadioButton key={key} index={key} answer={answer} handleUserAnswer={handleUserAnswer} />
    ))
    setRadioButtons(enabledRadioButtons)
  }, [currentQuestion])

  useEffect(() => {
    if (questionAnswered) {
      let disabledRadioButtons = answerPositions.map((answer, key) => (
        <RadioButton key={key} index={key} answer={answer} handleUserAnswer={handleUserAnswer} disabled='disabled' checked={false} />
      ))
      setRadioButtons(disabledRadioButtons)
    }
  }, [questionAnswered, answerPositions])

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
    <main>
      <header className='main-header'>
        <h1>Lunch Time Trivia!</h1>
      </header>
      <section className='section-container'>
        <div className='section-card'>
          <h2 className='section-header'>Question {currentRound + 1}</h2>
          <p>{currentQuestion.question}</p>
        </div>
        <form onSubmit={(e) => validateAnswers(e, userAnswer, currentQuestion.correct)}>
          {radioButtons}
          <button>Submit Answer</button>
        </form>
      </section>
    </main>
  :
    <main>
      <header className='main-header'>
        <h1>Lunch Time Trivia!</h1>
      </header>
      <section className='section-container'>
        <div className='section-card'>
          <h1 className='section-header'>Question {currentRound + 1}</h1>
          <p>{currentQuestion.question}</p>
          <h2 className='answer-display'>{correctAnswer ? 'Correct!' : `Incorrect :( The correct answer was ${currentQuestion.correct}.`}</h2>
        </div>
        <form onSubmit={nextQuestion}>
          {radioButtons}
          <button>Next Question</button>
        </form>
      </section>
    </main>

  return (
    questionDisplay
  )
}

export default Question