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
        <div>
        <h1>Tandem Trivia!</h1>
        <h3>Leaderboard</h3>
        {leaderboard}
        <form onSubmit={getTriviaGame}>
          <label  htmlFor='name'>Enter Name: </label>
          <input type='text' id='name' onChange={handleNameChange} required />
          <button>Begin</button>
        </form>
      </div>
    )
}

export default Start