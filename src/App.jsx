import React, {useState} from "react";
import Board from "./components/Board";
import { calculateWinner } from "./helpers";
import './styles/root.scss';

const App = () => {
  const [history,setHistory] = useState([{board:Array(9).fill(null), isXNext: true}])
  
  const [currentMove, setCurrentMove]= useState(0);    //for keeping count of each move index

  const current = history[currentMove];
  // no need to use state as board will re-render every time state changes and the 
  // below winner function will execute
  const winner  = calculateWinner(current.board);

  const message = winner ? `Winner is ${winner}` : `Next player is ${current.isXNext ? 'X': 'O'}`;
  
  const handleSquareClick = position => {
    
    if(current.board[position] || winner){      // the game will run till both get satisfied i.e, till all positions are filled or winner is declared
      return;
    }

    setHistory( prev => {
      const last = prev[prev.length -1];  // this will give the last element of the previous array

      const newBoard = last.board.map((square,pos) => {   //this will add new board state to prev state array
        if(pos === position){
          return last.isXNext ? "X" : "O";
        } 
        return square;
      });
      return prev.concat({board: newBoard, isXNext : !last.isXNext});
   });
    setCurrentMove(prev => prev + 1);            // incrementing prev after each move
  };
  console.log(history)                         // check console for clear understanding of state

  return (
  <div className="app">
  <h1>TIC TAC TOE</h1>
  <h1>{message}</h1>
  <Board board={current.board} handleSquareClick={handleSquareClick}/>
  </div>
  )
  };

  export default App;