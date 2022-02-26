import React, {useState} from "react";
import Board from "./components/Board";
import { calculateWinner } from "./helpers";
import './styles/root.scss';

const App = () => {
  const [board,setBoard] = useState(Array(9).fill(null));
  const [isXNext , setIsXNext] = useState(false);
  
  // no need to use state as board will re-render every time state changes and the 
  // below winner function will execute
  const winner  = calculateWinner(board);

  const message = winner ? `Winner is ${winner}` : `Next player is ${isXNext ? 'X': 'O'}`;
  
  const handleSquareClick = position => {
    
    if(board[position] || winner){
      return;
    }

    setBoard( prev => {
      return prev.map((square,pos) => {
        if(pos === position){
          return isXNext ? "X" : "O";
        } 
        return square;
      });
   });
   setIsXNext((prev)=> !prev );
   console.log(board);
  };

  return (
  <div className="app">
  <h1>TIC TAC TOE</h1>
  <h1>{message}</h1>
  <Board board={board} handleSquareClick={handleSquareClick}/>
  </div>
  )
  };

  export default App;