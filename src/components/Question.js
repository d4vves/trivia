import React, { useEffect, useState } from 'react'
import RadioButton from './RadioButton'
import shuffleData from '../utils/shuffleData'
import replaceCharacters from '../utils/replaceCharacters'

const Question = ({ config }) => {
  const { currentQuestion, currentRound, nextQuestion, questionAnswered, setQuestionAnswered, updatePlayerScore, updatePlayersList } = config

  const [correctChoice, setCorrectChoice] = useState('')
  const [incorrectChoices, setIncorrectChoices] = useState('')
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

  useEffect(() => {
    setCorrectChoice(currentQuestion.correct_answer)
    setIncorrectChoices(currentQuestion.incorrect_answers)
  }, [currentQuestion])

  useEffect(() => {
    if (correctChoice && incorrectChoices && incorrectChoices.length > 2) {
      let unshuffledAnswers = [...incorrectChoices, correctChoice]
      let shuffledAnswers = shuffleData(unshuffledAnswers)
      setAnswerPositions(shuffledAnswers)
    }
  }, [incorrectChoices, correctChoice])

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

  const finalButton = currentRound === 9 ? 'End Round' : 'Next Question'
  const parsedQuestion = currentQuestion ? replaceCharacters(currentQuestion.question) : ''

  let questionDisplay = 
  !questionAnswered ?
    <main>
      <header className='main-header'>
        <h1>Lunch Time Trivia!</h1>
      </header>
      <section className='section-container'>
        <div className='section-card'>
          <h2 className='section-header'>Question {currentRound + 1}</h2>
          <p>{parsedQuestion}</p>
        </div>
        <form onSubmit={(e) => updateGameplay(e, userAnswer, currentQuestion.correct_answer)}>
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
          <p>{parsedQuestion}</p>
          <h2 className='answer-display'>{correctAnswer ? 'Correct!' : `Incorrect :( The correct answer was ${currentQuestion.correct_answer}.`}</h2>
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