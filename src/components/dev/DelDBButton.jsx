import { delDB } from "../../services/firebase"

const DelDBButton = () => {

  const handleButtonClick = () => {
    delDB()
  }

  return (
    <div>
      <button className="red-button" id="del-db-button" onClick={handleButtonClick}>Delete all database information</button>
    </div>
  )
}

export default DelDBButton