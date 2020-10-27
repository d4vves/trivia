import React from 'react'

const RadioButton = ({ index, answer, handleUserAnswer }) => {
    return (
        <>
            <input type='radio' id={index} name='answer' value={answer} onClick={handleUserAnswer} />
            <label htmlFor={index}>{answer}</label>
        </>
    )
}

export default RadioButton