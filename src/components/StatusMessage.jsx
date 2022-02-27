import React from 'react'

const StatusMessage = ({winner,current}) => {
  const noMovesLeft = current.board.every((element)=> element != null);    //this will traverse the whole array and returns true if no null is present
  return (                                                                
    // below is the status message template which display messages when the corresponding conditions are true
    <h2>                                               
      {winner && `Winner is ${winner}`}                                             
      {!winner && !noMovesLeft && `Next player is ${current.isXNext ? 'X' : 'O'}`}
      {!winner &&  noMovesLeft && 'X and O tied'} 
    </h2>
  )
}

export default StatusMessage