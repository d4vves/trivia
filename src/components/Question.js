import React, { useEffect, useState } from 'react'
import RadioButton from './RadioButton'

const Question = ({ currentQuestion, currentRound, shuffleData }) => {
    const [radioButtons, setRadioButtons] = useState([])
    const [userAnswer, setUserAnswer] = useState('')

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
          console.log('CORRECT')
        } else {
          console.log('WRONG')
        }
      }
    
    return (
        <div>
          <h1>Question {currentRound + 1}</h1>
          <p>{currentQuestion.question}</p>
          <form onSubmit={(e) => validateAnswers(e, userAnswer, currentQuestion.correct)}>
              {radioButtons}
            <button>Submit Answer</button>
          </form>
        </div>
    )
}

export default Question