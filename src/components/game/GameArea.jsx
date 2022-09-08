import { useState, useEffect } from "react";
import { db, newGame } from "../../services/firebase"
import { ref, get, onValue, query, orderByChild } from "firebase/database"
import { addPlayer2 } from "../../services/firebase";

// React components

const GameArea = (props) => {
  const [DBData, setDBData] = useState("")
  const [gameData, setGameData] = useState("") //518926
  const [joinGameTextValue, setJoinGameTextValue] = useState("")
  
   // Keep gamedata updated
  const gameRef = ref(db, "games/")
  useEffect(() => {
    onValue(gameRef, (snapshot) => {
      onUpdate(snapshot.val())
    })
  }, [])

  const onUpdate = (data) => {
    setDBData(data)
  }

  const handleJoinGameClick = () => {
    if (joinGameTextValue) {
      for (var gameKey in DBData) {
        if (DBData[gameKey].gameID == joinGameTextValue) {
          // USE FOR TESTING ONLY | CORRECT CODE BENEATH
          if (!DBData[gameKey].player2.uid && !DBData[gameKey].player2.displayName) {
            setGameData(DBData[gameKey])
            addPlayer2(props.user, gameKey)
          } else {
            setGameData(DBData[gameKey])
          }

          // if (!DBData[gameKey].player2.uid && !DBData[gameKey].player2.displayName) {
          //   setGameData(DBData[gameKey])
          //   addPlayer2(props.user, gameKey)
          // } else {
          //   console.log("already full")
          // }
        }
      }
    } else {
      console.log("no code") 
    }
  }

  const joinGame = (newGameKey) => {
    setGameData(DBData[newGameKey])
  }

  const handleJoinGameTextChange = event => {
    setJoinGameTextValue(event.target.value)
  }

  const handleLeaveGameClick = event => {
    setGameData("")
  }
//databasen oppdatera ikkje fort nok elns vekkje ass
  const newGameClickHandler = () => {
    const newGameRef = newGame(props.user)
    joinGame(newGameRef)
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

    return(
      <div>
        <button onClick={handleLeaveGameClick}>Leave Game</button>
        <h2>Current Game: {currentGameID}</h2>
        <h3>Player 1: {player1DisplayName}</h3>
        <h3>Player 2: {player2DisplayName}</h3>
      </div>
    )
  }
}

export default GameArea;