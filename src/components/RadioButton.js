import React from 'react'

const RadioButton = ({ index, answer, handleAnswerChange, selectedOption, handleOptionChange, disabled }) => {

    return (
        <div className={`radio-button-container`}>
            <input 
                type='radio'
                id={index}
                name='answer'
                value={answer}
                onClick={handleAnswerChange}
                onChange={handleOptionChange}
                checked={selectedOption === answer}
                disabled={disabled}
                required
            />
            <label htmlFor={index} className='radio-button-label'>{answer}</label>
        </div>
    )
}

export default RadioButton