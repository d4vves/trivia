import React from 'react'

const Start = ({ getTriviaGame, handleNameChange, playersList }) => {
  let leaderboard = 
    playersList.length < 1 ?
      <p>No scores.</p>
    :
      playersList.map((player, key) => (
        <p key={key}>{player.name} - {player.score}</p>
      ))
      
    return (
      <main>
        <header className='main-header'>
          <h1>Lunch Time Trivia!</h1>
        </header>
        <section className='section-container'>
          <div className='section-card'>
            <h2 className='section-header'>Leaderboard</h2>
            <div className='player-scores'>
              {leaderboard}
            </div>
          </div>
          <form className='section-form' onSubmit={getTriviaGame}>
            <label  htmlFor='name'>Enter Name: </label>
            <input type='text' id='name' onChange={handleNameChange} required />
            <button>Begin</button>
          </form>
        </section>
      </main>
    )
}

export default Start