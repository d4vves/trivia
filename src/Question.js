import React from 'react'

const Question = ({ currentQuestion, currentRound, advanceRound, shuffleData }) => {
    let unshuffledAnswers = [...currentQuestion.incorrect, currentQuestion.correct]
    let shuffledAnswers = shuffleData(unshuffledAnswers)
    let answerButtons = shuffledAnswers.map((answer, key) => (
        <>
            <input type='radio' id={key} name='answer' />
            <label for={key}>{answer}</label>
        </>
    ))
    
    return (
        <div>
          <h1>Question {currentRound + 1}</h1>
          <p>{currentQuestion.question}</p>
          <form onSubmit={advanceRound}>
              {answerButtons}
            <button>Submit Answer</button>
          </form>
        </div>
    )
}

export default Question