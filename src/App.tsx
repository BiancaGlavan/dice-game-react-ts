import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import Button from './components/Button';
import Player from './components/Player';
import dice1 from './assets/inverted-dice-1.svg';
import dice2 from './assets/inverted-dice-2.svg';
import dice3 from './assets/inverted-dice-3.svg';
import dice4 from './assets/inverted-dice-4.svg';
import dice5 from './assets/inverted-dice-5.svg';
import dice6 from './assets/inverted-dice-6.svg';

const dices = [dice1, dice2, dice3, dice4, dice5, dice6];

function App() {
  const [playerTurn, setPlayerTurn] = useState(1);
  const [isGameActive, setIsGameActive] = useState(true);
  const [player1TotalScore, setPlayer1TotalScore] = useState(0);
  const [player2TotalScore, setPlayer2TotalScore] = useState(0);
  const [player1CurrentScore, setPlayer1CurrentScore] = useState(0);
  const [player2CurrentScore, setPlayer2CurrentScore] = useState(0);
  const [diceValue, setDiceValue] = useState(0);
  const [winner, setWinner] = useState('');

  const randomIntFromInterval = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const resetGame = () => {
    setPlayerTurn(1);
    setIsGameActive(true);
    setPlayer1TotalScore(0);
    setPlayer2TotalScore(0);
    setPlayer1CurrentScore(0);
    setPlayer2CurrentScore(0);
    setWinner('');
    setDiceValue(0);

  }

  const changePlayerTurn = () => {

    if (playerTurn === 1) {
      setPlayerTurn(2);
    } else {
      setPlayerTurn(1);
    }

  }

  const holdCurrentScore = () => {
    if (playerTurn === 1) {
      setPlayer1TotalScore(player1TotalScore + player1CurrentScore);
      setPlayer1CurrentScore(0);
    } else {
      setPlayer2TotalScore(player2TotalScore + player2CurrentScore);
      setPlayer2CurrentScore(0);
    }

    changePlayerTurn();
  }

  const checkWinner = () => {

    if (player1TotalScore >= 100) {
      setIsGameActive(false);
      setWinner('Player 1 won.');
    }

    if (player2TotalScore >= 100) {
      setIsGameActive(false);
      setWinner('Player 2 won.');
    }

  }

  const handleResetGame = () => {
    resetGame();

  }

  const handleRollDice = () => {

    if (!isGameActive) {
      return false;
    }

    const diceVal = randomIntFromInterval(1, 6);
    setDiceValue(diceVal);
    console.log('Roll dice button was clicked', diceVal);

    if (diceVal === 1) {
      if (playerTurn === 1) {
        setPlayer1CurrentScore(0);

      } else {
        setPlayer2CurrentScore(0);

      }

      changePlayerTurn();

    } else {
      if (playerTurn === 1) {
        setPlayer1CurrentScore(player1CurrentScore + diceVal);
      } else {
        setPlayer2CurrentScore(player2CurrentScore + diceVal);
      }
    }
  }

  const handleHold = () => {
    holdCurrentScore();
  }


  useEffect(() => {
    checkWinner();
    console.log('we called check winner from useeffect');
  }, [player1TotalScore, player2TotalScore]);

  return (
    <div className="App">
      <div className="container">
        <div className="winner">{winner}</div>
        {isGameActive ? <div className="player-turn">Player {playerTurn} turn</div> : null}
        <div className="game">

          <Player playerNr={1} currentScore={player1CurrentScore} totalScore={player1TotalScore} />
          <Player playerNr={2} currentScore={player2CurrentScore} totalScore={player2TotalScore} />

          <div className="buttons">
            <Button text='New Game' onClick={handleResetGame} />
            <div className="dice">
              <img className="dice-image" src={dices[diceValue - 1]} alt="" />
            </div>
            <Button text='ROLL DICE' onClick={handleRollDice} />
            <Button text='HOLD' onClick={handleHold} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
