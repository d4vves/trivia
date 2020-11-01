import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
            nextQuestion: jest.fn(e => e.preventDefault()),
            setQuestionAnswered: jest.fn(),
            updatePlayerScore: jest.fn(),
            updatePlayersList: jest.fn()
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

    describe('when an incorrect answer is submitted', () => {
        it('should display the correct answer', () => {
            render(<Question config={ {...mockConfig, questionAnswered: true} } />)
            const correctAnswer = screen.getByText('Incorrect :( The correct answer was Devmynd.')
            expect(correctAnswer).toBeInTheDocument()
        })
    })

    describe('when an answer is submitted', () => {
        it('should set the questionAnswered state', () => {
            render(<Question config={mockConfig} />)
            userEvent.click(screen.getByRole('button'))
            expect(mockConfig.setQuestionAnswered).toBeCalled()
        })
    })

    describe('after an answer is submitted', () => {
        it('should call the nextQuestion function on the next submit', () => {
            render(<Question config={ {...mockConfig, questionAnswered: true} } />)
            userEvent.click(screen.getByRole('button'))
            expect(mockConfig.nextQuestion).toBeCalled()
        })
    })

})