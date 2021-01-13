import React, { useEffect, useState } from 'react';

import { LoginForm } from './Components/LoginForm';
import { Site } from './Components/Site';
import { apiFetch } from './utils/api';

export default function App() {
  const [user, setUser] = useState(null)

  // useEffect = componentDidMount
  useEffect(function () {
      apiFetch('/me')
        .then(setUser)
        .catch(() => setUser(false))
    }, []) 

  if (user === null) {
    return null;
  }

  return (
    user ? <Site /> : <LoginForm onConnect={setUser}/>
  );
}
 
