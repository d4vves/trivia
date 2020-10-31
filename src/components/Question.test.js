import { render, screen } from '@testing-library/react'
import Question from './Question'

describe('Question', () => {

    let mockConfig

    beforeEach(() => {
        mockConfig = {
            currentQuestion: {
                correct: 'Devmynd',
                incorrect: ['Tandem', 'Burger Shack', 'Extraordinary Humans'],
                question: 'What was Tandem previous name?'
            },
            currentRound: 0,
         }
    })

    describe('when questions are unanswered', () => {
        it('has enabled radio buttons', () => {
            render(<Question config={mockConfig} />)
            const radio = screen.getAllByRole('radio')
            expect(radio[0]).toBeEnabled()
        })
    })

    describe('when questions are answered', () => {
        it('has disabled radio buttons', () => {
            render(<Question config={ {...mockConfig, questionAnswered: true} } />)
            const radio = screen.getAllByRole('radio')
            expect(radio[0]).toBeDisabled()
        })
    })

    describe('when an answer is selected', () => {
        it('sets userAnswer to the selected  value', () => {

        })
    })

    describe('if the user submits the correct answer', () => {
        it('sets correctAnswer to true', () => {

        })
    })

})