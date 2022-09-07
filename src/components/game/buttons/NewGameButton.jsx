import { newGame } from "../../../services/firebase";

const NewGameButton = (props) => {
  const user = props.user

  const buttonClickHandler = event => {
    newGame(user)
  }

  return(
    <div>
      <button onClick={buttonClickHandler} user={user}>New game</button>
    </div>
  )
}

export default NewGameButton; 