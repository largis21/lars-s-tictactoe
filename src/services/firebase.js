import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, onValue, push, child, remove } from "firebase/database"
import { validateGameState } from "../components/game/validateGameState";

const firebaseConfig = {
  apiKey: "AIzaSyCgS3LF7GOjLQSH1peav7__cXjuKicSLGE",
  authDomain: "lars-s-tictactoe.firebaseapp.com",
  projectId: "lars-s-tictactoe",
  storageBucket: "lars-s-tictactoe.appspot.com",
  messagingSenderId: "219129050270",
  appId: "1:219129050270:web:1fd6ad46492b1bc4f1378f",
  databaseURL: "https://lars-s-tictactoe-default-rtdb.europe-west1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode)
  })
}

export const signOffWithGoogle = () => {
  signOut(auth, googleProvider)
}

export const delDB = () => {
  const dbRef = ref(db, "games/")
  set(dbRef, "")
}

export const newGame = (user) => {
  const randomID = Math.floor(100000 + Math.random() * 900000).toString();

  const userInfo = {
    displayName: user.displayName,
    uid: user.uid
  }

  const gameRef = ref(db, '/games/');
  const newGameRef = push(gameRef, {
    gameID: randomID,
    player1: userInfo,
    player2: {displayName: "", uid: ""},
    gameState: {
      turn: "x",
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: ""
    }
  })

  return newGameRef.key
}

export const addNewPlayer = (user, gameKey, playerNr) => {
  const userInfo = {
    displayName: user.displayName,
    uid: user.uid
  }

  const playerRef = ref(db, "games/"+gameKey+"/player"+playerNr)
  set(playerRef, userInfo)
}

export const removePlayer2 = (user, gameKey) => {
  const player2Ref = ref(db, "games/"+gameKey+"/player2")
  set(player2Ref, {displayName: "", uid: ""})
}

export const removeGame = (gameKey) => {
  const gameRef = ref(db, "games/"+gameKey)
  remove(gameRef)
}

export const addToBoard = (turn, position, gameKey, gameState) => {
  const turnRef = ref(db, "games/"+gameKey+"/gameState/turn")
  if (turn == "x") {
    set(turnRef, "o")
  } else {
    set(turnRef, "x")
  }
  const positionRef = ref(db, "games/"+gameKey+"/gameState/"+position)
  set(positionRef, turn)
}

export const resetGame = (gameKey, gameData) => {
  const newPlayer1 = gameData.player2
  const newPlayer2 = gameData.player1

  const gameRef = ref(db, '/games/'+gameKey);
  set(gameRef, {
    gameID: gameData.gameID,
    player1: newPlayer1,
    player2: newPlayer2,
    gameState: {
      turn: "x",
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: ""
      }
    })
}