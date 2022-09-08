import { useState, useEffect } from "react";
import { db } from "../../services/firebase"
import { ref, get, onValue, query, orderByChild } from "firebase/database"

// React components
import JoinGame from "../joinGame/JoinGame";

const GameArea = (props) => {
  const [gameData, setGameData] = useState("")
  const [currentGame, setCurrentGame] = useState();
  const [joinGameTextValue, SetJoinGameTextValue] = useState("")
  const [gameFound, setGameFound] = useState(false)
  const [gameSearchID, setGameSearchID] = useState("470667")

  // her du slapp lars
  const findGame = (gameSearchID) => {
    const gameRef = ref(db, "games/")
  }

  // Keep gamedata updated
  const gameRef = ref(db, "games/")
  useEffect(() => {
    onValue(gameRef, (snapshot) => {
      onUpdate(snapshot.val())
    })
  }, [])
  const onUpdate = (data) => {
    for (var objectKey in data) {
      if (data[objectKey].gameID == currentGame) {
        setGameData(data[objectKey])
      }
    }
  }
  
  // asd
  

  const handleJoinGameClick = () => {
    if (joinGameTextValue) {
      findGame(joinGameTextValue)
    } else {
      console.log("no code") 
    }
  }

  const handleJoinGameTextChange = event => {
    SetJoinGameTextValue(event.target.value)
  }

  return(
    <div>
      <div>
        <input onChange={handleJoinGameTextChange} type="text" placeholder="Six digit code:"/>
        <button onClick={handleJoinGameClick}>Join Game</button>
      </div>
      <h2>Current Game: {currentGame}</h2>
      <h3>Player 1: </h3>
      <h3>Player 2: </h3>
    </div>
  )
}

export default GameArea;