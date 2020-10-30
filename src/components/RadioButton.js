import React from 'react'

const RadioButton = ({ index, answer, handleUserAnswer, checked, disabled }) => {

    return (
        <div className={`radio-button-container radio-button-default`}>
            <input type='radio' id={index} name='answer' value={answer} onClick={handleUserAnswer} checked={checked} disabled={disabled} required />
            <label htmlFor={index} className='radio-button-label'>{answer}</label>
        </div>
    )
}

export default RadioButton