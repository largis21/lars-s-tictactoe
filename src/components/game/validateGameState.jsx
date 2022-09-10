export const validateGameState = (gameData) => {
  if (gameData) {
    const values = gameData.gameState
    if (values[0] && values[0] === values[1] && values[0] === values[2]) {
      return values[0] 
    } else if (values[3] && values[3] === values[4] && values[3] === values[5]) {
      return values[3] 
    } else if (values[6] && values[6] === values[7] && values[6] === values[8]) {
      return values[6] 
    } else if (values[0] && values[0] === values[3] && values[0] === values[6]) {
      return values[0] 
    } else if (values[1] && values[1] === values[4] && values[1] === values[7]) {
      return values[1] 
    } else if (values[2] && values[2] === values[5] && values[2] === values[8]) {
      return values[2] 
    } else if (values[0] && values[0] === values[4] && values[0] === values[8]) {
      return values[0] 
    } else if (values[2] && values[2] === values[4] && values[2] === values[6]) {
      return values[2] 
    } else if (values[0] && values[1] && values[2] && values[3] && values[4] && values[5] && values[6] && values[7] && values[8]) {
      return "draw"
    }
    

    return
  }
}