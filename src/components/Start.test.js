import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Start from './Start'

describe('Start', () => {

    describe('when playersList is empty', () => {
        it('should render the default text', () => {
            render(<Start playersList={[]} />)
            const defaultText = screen.getByText("No scores. Enter your name and click begin to start rackin' up those points!")
            expect(defaultText).toBeInTheDocument()
        })
    })

    describe('when playersList is populated', () => {
        it('should render player name and score', () => {
            render(<Start playersList={[{name: 'Dave', score: 10}]} />)
            const playerElement = screen.getByText('Dave - 10')
            expect(playerElement).toBeInTheDocument()
        })
    })

    describe('when a name is inputted', () => {
        it('should call the onChange event', () => {
            const mockChange = jest.fn()
            render(<Start playersList={[]} handleNameChange={mockChange} />)
            userEvent.type(screen.getByRole('textbox'), 'Dave')
            expect(mockChange).toHaveBeenCalledTimes(4)
        })
    })

    describe('when the form is submitted', () => {
        it('should call  the onSubmit event', () => {
            const mockSubmit = jest.fn(e => e.preventDefault())
            render (<Start playersList={[]} getTriviaGame={mockSubmit} />)
            userEvent.click(screen.getByRole('button'))
            expect(mockSubmit).toHaveBeenCalled()
        })
    })

})