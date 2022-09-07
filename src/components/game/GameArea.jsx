import { useState, useEffect } from "react";
import { db } from "../../services/firebase"
import { ref, get, onValue, query, orderByChild } from "firebase/database"

const GameArea = (props) => {
  const [gameData, setGameData] = useState("")

  const propsGameID = props.gameID

  const gameRef = ref(db, "games/")
  useEffect(() => {
    onValue(gameRef, (snapshot) => {
      onUpdate(snapshot.val())
    })
  }, [])

  const onUpdate = (data) => {
    for (var objectKey in data) {
      if (data[objectKey].gameID == propsGameID) {
        setGameData(data[objectKey])
      }
    }
  }
  
  if (gameData) {
    console.log(gameData)
  }

  return(
    <div>
      <h2>Current Game: {propsGameID}</h2>
      <h3>Player 1: </h3>
      <h3>Player 2: </h3>
    </div>
  )
}

export default GameArea;