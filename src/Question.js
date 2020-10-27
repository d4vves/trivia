import React from 'react'

const Question = ({ currentQuestion, currentRound, advanceRound, shuffleData }) => {
    
    return (
        <div>
          <h1>Question {currentRound + 1}</h1>
          <p>{currentQuestion.question}</p>
          <form onSubmit={advanceRound}>
            <button>Submit Answer</button>
          </form>
        </div>
    )
}

export default Question