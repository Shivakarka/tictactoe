import React, {useState} from "react";
import Board from "./components/Board";
import History from "./components/History";
import StatusMessage from "./components/StatusMessage";
import { calculateWinner } from "./helpers";
import './styles/root.scss';

const App = () => {
 
  const NEW_GAME = [{board:Array(9).fill(null), isXNext: true}]

  const [history,setHistory] = useState(NEW_GAME)
  
  const [currentMove, setCurrentMove]= useState(0);    //for keeping count of each move index

  const current = history[currentMove];
  // no need to use state as board will re-render every time state changes and the 
  // below winner function will execute
  const {winner,winningSquares}  = calculateWinner(current.board);

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
  console.log(history)    // check console for clear understanding of state

  const moveTo = (move) => {                  // handler function to toggle to a specific move
    setCurrentMove(move);
  }

  const onNewGame= () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
  <div className="app">
  <h1>TIC <span className="text-green">TAC </span>TOE</h1>
  <StatusMessage winner={winner} current={current}/>
  <Board board={current.board} handleSquareClick={handleSquareClick} winningSquares={winningSquares}/>
  <button type="button" onClick={()=>onNewGame()} className={`btn-reset ${winner ? 'active' : ""}`}>Start New Game</button>
  <h2 style={{fontWeight:"normal"}}>Current Game History</h2>
  <History history={history} moveTo={moveTo} currentMove={currentMove}/>
  <div className="bg-balls"></div>
  </div>
  )
  };

  export default App;