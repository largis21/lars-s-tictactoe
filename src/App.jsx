import './App.css';

import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from './services/firebase';


// React components
import DefaultLandingPage from './components/DefaultLandingPage';
import SignoutGoogleButton from './components/auth/SignoutGoogle';
import NewGameButton from './components/game/buttons/NewGameButton';
import JoinGame from './components/joinGame/JoinGame';
import GameArea from './components/game/GameArea';

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  })

  if (!user) {
    return (
      <div className="App">
        <DefaultLandingPage />
      </div>
    )
  } else {
    const userFullName = user.displayName
    return (
      <div className="App">
        <h1>Hei {userFullName} 😃</h1>
        <SignoutGoogleButton />
        <NewGameButton user={user}/>
        <GameArea user={user} />
      </div>
    );
  }
}

export default App;
