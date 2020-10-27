import React from 'react'

const Question = ({ currentQuestion, round, changeQuestion }) => {
    
    return (
        <div>
          <h1>Question {round + 1}</h1>
          <p>{currentQuestion.question}</p>
          <form onSubmit={changeQuestion}>
            <button>Submit Answer</button>
          </form>
        </div>
    )
}

export default Question