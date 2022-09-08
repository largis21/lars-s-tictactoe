import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, onValue, push, child } from "firebase/database"

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
    turn: "x",
    values: {
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

export const addPlayer2 = (user, gameKey) => {
  const userInfo = {
    displayName: user.displayName,
    uid: user.uid
  }

  const gameRef = ref(db, "games/"+gameKey+"/player2")
  set(gameRef, userInfo)
}