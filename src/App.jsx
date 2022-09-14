import './App.css';

import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from './services/firebase';


// React components
import DefaultLandingPage from './components/DefaultLandingPage';
import SignoutGoogleButton from './components/auth/SignoutGoogle';
import GameArea from './components/game/GameArea';
import Chat from './components/chat/Chat';

// React components for dev use
import DelDBButton from './components/dev/DelDBButton';

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
        <div className="main-margins">
          <div className="navbar">
            <h1>Hei, {userFullName} 😃</h1>
            <SignoutGoogleButton />
          </div>
          <div className="content">
            <GameArea user={user} />
            <Chat user={user}/>
          </div>
        </div>
        </div>
    );
  }
}

export default App;
