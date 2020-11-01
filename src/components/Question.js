import React, { useEffect, useState } from 'react'
import RadioButton from './RadioButton'
import shuffleData from '../utils/shuffleData'

const Question = ({ config }) => {
  const { currentQuestion, currentRound, nextQuestion, questionAnswered, setQuestionAnswered, updatePlayerScore, updatePlayersList } = config

  const [radioButtons, setRadioButtons] = useState([])
  const [answerPositions, setAnswerPositions] = useState([])
  const [userAnswer, setUserAnswer] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [selectedOption, setSelectedOption] = useState(false)

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value)
  }
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }

  useEffect(() => {
    let unshuffledAnswers = [...currentQuestion.incorrect, currentQuestion.correct]
    let shuffledAnswers = shuffleData(unshuffledAnswers)
    setAnswerPositions(shuffledAnswers)
  }, [currentQuestion.correct, currentQuestion.incorrect])

  useEffect(() => {
    if (questionAnswered) return

    let enabledRadioButtons = answerPositions.map((answer, key) => (
      <RadioButton
        key={key}
        index={key}
        answer={answer}
        handleAnswerChange={handleAnswerChange}
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
      />
    ))
    setRadioButtons(enabledRadioButtons)
  }, [answerPositions, currentQuestion, questionAnswered, selectedOption])

  useEffect(() => {
    if (!questionAnswered) return

    let disabledRadioButtons = answerPositions.map((answer, key) => (
      <RadioButton
        key={key}
        index={key}
        answer={answer}
        handleAnswerChange={handleAnswerChange}
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
        disabled
      />
    ))
    setRadioButtons(disabledRadioButtons)
  }, [questionAnswered, answerPositions, selectedOption])

  const updateGameplay = (e, userAnswer, correctAnswer) => {
    e.preventDefault()
    const isCorrectAnswer = userAnswer === correctAnswer
    setQuestionAnswered(true)
    setCorrectAnswer(isCorrectAnswer)
    updatePlayerScore(isCorrectAnswer)
    if (currentRound === 9) {
      updatePlayersList()
    }
  }

  const finalButton = currentRound === 9 ? 'End Round' : 'Next Question'

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
        <form onSubmit={(e) => updateGameplay(e, userAnswer, currentQuestion.correct)}>
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
          <button>{finalButton}</button>
        </form>
      </section>
    </main>

  return (
    questionDisplay
  )
}

export default Question