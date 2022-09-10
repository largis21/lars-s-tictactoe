import { useState, useEffect } from "react";
import { db, newGame, removeGame } from "../../services/firebase"
import { ref, get, onValue, query, orderByChild } from "firebase/database"
import { addNewPlayer, addToBoard } from "../../services/firebase";
import { contains } from "@firebase/util";
import { validateGameState } from "./validateGameState";

const GameArea = (props) => {
  const [DBData, setDBData] = useState("")
  const [gameData, setGameData] = useState("") //518926
  const [joinGameTextValue, setJoinGameTextValue] = useState("")
  const [currentGameKey, setCurrentGameKey] = useState("")

  const [winnerText, setWinnerText] = useState("")
  const [winnerTextClasses, setWinnerTextClasses] = useState("")

  const [joinGameErrorCode, setJoinGameErrorCode] = useState("")

  
   // Keep gamedata updated
  const gameRef = ref(db, "games/")
  useEffect(() => {
    onValue(gameRef, (snapshot) => {
      setDBData(snapshot.val())
    })
  }, [])

  const handleJoinGameClick = () => {
    var foundGame = false;
    if (joinGameTextValue) {
      for (var gameKey in DBData) {
        if (DBData[gameKey].gameID == joinGameTextValue) {
          foundGame = true
          if (!DBData[gameKey].player1.displayName) {
            setCurrentGameKey(gameKey)
            addNewPlayer(props.user, gameKey, "1")
          } else if (!DBData[gameKey].player2.displayName) {
            setCurrentGameKey(gameKey)
            addNewPlayer(props.user, gameKey, "2")
          } else {
            setJoinGameErrorCode("Game is full")
          }
          }
        }
        if (!foundGame) setJoinGameErrorCode("Could not find game")
      } else {
        setJoinGameErrorCode("Please enter a code")
    }
  }

  useEffect(() => {
    setGameData(DBData[currentGameKey])
    const validation = validateGameState(gameData)
    if (validation) {
      gameWon(validation)
    }
  })

  const gameWon = (validation) => {
    if (validation == "draw") {
      setWinnerText("Draw!")
      setWinnerTextClasses("winner-text winner-text-yellow")
    }
    if (validation == "❌" && props.user.uid == gameData.player1.uid) {
      setWinnerText("You won!")
      setWinnerTextClasses("winner-text winner-text-green")
    } else if (validation == "⭕" && props.user.uid == gameData.player2.uid) {
      setWinnerText("You won!")
      setWinnerTextClasses("winner-text winner-text-green")
    } else if (validation == "❌" && props.user.uid == gameData.player2.uid) {
      setWinnerText("You lost :(")
      setWinnerTextClasses("winner-text winner-text-red")
    } else if (validation == "⭕" && props.user.uid == gameData.player1.uid) {
      setWinnerText("You lost :(")
      setWinnerTextClasses("winner-text winner-text-red")
    }

    setTimeout(() => {
      removeGame(currentGameKey, 3000)
      setCurrentGameKey("")
      setJoinGameTextValue("")
      setGameData("")
      setWinnerText("")
      setWinnerTextClasses("")
    }, 3000);
  }

  const handleJoinGameTextChange = event => {
    setJoinGameTextValue(event.target.value)
    setJoinGameErrorCode("")
  }
  const handleLeaveGameClick = event => {
    setCurrentGameKey("")
  }
  const newGameClickHandler = () => {
    const newGameRef = newGame(props.user)
    setCurrentGameKey(newGameRef)
  }

  if (!gameData) {
    return (
      <div>
        <div className="game-intro">
          <button onClick={newGameClickHandler}>New game</button>
          <h3>or</h3>
          <div className="join-with-code">
            <input onChange={handleJoinGameTextChange} type="text" placeholder="Six digit code:"/>
            <button onClick={handleJoinGameClick}>Join Game</button>
          </div>
          <h3 className="join-game-error-text">{joinGameErrorCode}</h3>
        </div>
      </div>
    )
  } else {
    const currentGameID = gameData.gameID

    const player1DisplayName = gameData.player1.displayName
    const player1UID = gameData.player1.uid

    const player2DisplayName = gameData.player2.displayName
    const player2UID = gameData.player2.uid

    const gameState = gameData.gameState
    const gameTurn = gameData.gameState.turn

    const handleGameButtonClicked = event => {
      gameButtonClicked(event.target.className)
    }

    const gameButtonClicked = (buttonClicked) => {
      if (gameTurn == "x" && props.user.uid == player1UID) {
        if (!gameState[buttonClicked]) {
          addToBoard(gameTurn, buttonClicked, currentGameKey, gameState)
        } 
      }

      if (gameTurn == "o" && props.user.uid == player2UID) {
        if (!gameState[buttonClicked]) {
          addToBoard(gameTurn, buttonClicked, currentGameKey, gameState)
        } 
      }
    }

    return(
      <div className="game-root">
        <div className="game-info">
          <h3>Current Game: {currentGameID}</h3>
          <h4><span>❌</span> {player1DisplayName}</h4>
          <h4><span>⭕</span> {player2DisplayName}</h4>
          <button className="red-button" onClick={handleLeaveGameClick}>Leave Game</button>
        </div>
        <div className="game-container">
          <div className="winner-text-container">
            <h3 className={winnerTextClasses}>{winnerText}</h3>
          </div>
          <div className="row">
            <button className="0" onClick={handleGameButtonClicked}>{gameState[0]}</button>
            <button className="1" onClick={handleGameButtonClicked}>{gameState[1]}</button>
            <button className="2" onClick={handleGameButtonClicked}>{gameState[2]}</button>
          </div>
          <div className="row">
            <button className="3" onClick={handleGameButtonClicked}>{gameState[3]}</button>
            <button className="4" onClick={handleGameButtonClicked}>{gameState[4]}</button>
            <button className="5" onClick={handleGameButtonClicked}>{gameState[5]}</button>
          </div>
          <div className="row">
            <button className="6" onClick={handleGameButtonClicked}>{gameState[6]}</button>
            <button className="7" onClick={handleGameButtonClicked}>{gameState[7]}</button>
            <button className="8" onClick={handleGameButtonClicked}>{gameState[8]}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default GameArea;