import { useState, useEffect } from "react";
import { db, newGame } from "../../services/firebase"
import { ref, get, onValue, query, orderByChild } from "firebase/database"
import { addNewPlayer, addToBoard } from "../../services/firebase";
import { contains } from "@firebase/util";
import { wonGameStates } from "./wonGameStates";

const GameArea = (props) => {
  const [DBData, setDBData] = useState("")
  const [gameData, setGameData] = useState("") //518926
  const [joinGameTextValue, setJoinGameTextValue] = useState("")
  const [currentGameKey, setCurrentGameKey] = useState("")
  
   // Keep gamedata updated
  const gameRef = ref(db, "games/")
  useEffect(() => {
    onValue(gameRef, (snapshot) => {
      setDBData(snapshot.val())
    })
  }, [])

  const handleJoinGameClick = () => {
    if (joinGameTextValue) {
      for (var gameKey in DBData) {
        if (DBData[gameKey].gameID == joinGameTextValue) {
          if (!DBData[gameKey].player1.displayName) {
            setCurrentGameKey(gameKey)
            addNewPlayer(props.user, gameKey, "1")
          } else if (!DBData[gameKey].player2.displayName) {
            setCurrentGameKey(gameKey)
            addNewPlayer(props.user, gameKey, "2")
          } else {
            //FOR DEV USE
            setCurrentGameKey(gameKey)
          }
          }
        }
      } else {
        console.log("no code")  
    }
  }

  useEffect(() => {
    setGameData(DBData[currentGameKey])
  })

  const handleJoinGameTextChange = event => {
    setJoinGameTextValue(event.target.value)
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
          addToBoard(gameTurn, buttonClicked, currentGameKey)
        } 
      }

      if (gameTurn == "o" && props.user.uid == player2UID) {
        if (!gameState[buttonClicked]) {
          addToBoard(gameTurn, buttonClicked, currentGameKey)
        } 
      }

      validateGameState()
    }

    //validation

    const validateGameState = () => {
      for (var item in gameState) {
        if (gameState[item] != "" && item != "turn") {
          console.log(gameState[item])
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