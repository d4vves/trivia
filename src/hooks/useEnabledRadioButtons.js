import { useEffect } from 'react'
import RadioButton from '../components/RadioButton'

const useEnabledRadioButtons = ({ questionAnswered, answerPositions, handleAnswerChange, selectedOption, handleOptionChange, setRadioButtons }) => {
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
      }, [answerPositions, handleAnswerChange, handleOptionChange, questionAnswered, selectedOption, setRadioButtons])
}

export default useEnabledRadioButtons