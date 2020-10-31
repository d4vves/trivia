import { render, screen } from '@testing-library/react'
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

})