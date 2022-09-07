import { useState } from "react"

const JoinGame = () => {
  const [textValue, setTextValue] = useState("")

  const handleClick = () => {
    if (textValue) {
      console.log(textValue)
    } else {
      console.log("no code") 
    }
  }

  const handleTextChange = event => {
    setTextValue(event.target.value)
  }

  return (
    <div>
      <input onChange={handleTextChange} type="text" placeholder="Six digit code:"/>
      <button onClick={handleClick}>Join Game</button>
    </div>
  )
}

export default JoinGame