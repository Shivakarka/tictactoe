import React,{useState} from 'react'
import Square from './Square';

const Board = ({board , handleSquareClick,winningSquares}) => {

  //render function which renders X or O when clicked
  const renderSquare = (position)=> {
   
    const isWinnerSquare = winningSquares.includes(position);        //for dynamic style (bold) when square is a winner

    return <Square 
    value={board[position]}
    onClick={()=> handleSquareClick(position)}
    isWinningSquare={isWinnerSquare}
    />

  }

  return (
    <div className="board">
      <div className='board-row'>
       {renderSquare(0)}
       {renderSquare(1)}
       {renderSquare(2)}
      </div>
      <div className='board-row'>
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
      </div>
      <div className='board-row'>
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
      </div>
    </div>
  )
}

export default Board