import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Login from './components/Login/Login';


export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Container style={{ minHeight: '100vh' }} className=" d-flex justify-content-center align-items-center ">
        <div className="border p-4 bg-dark text-white" style={{ minWidth: '400px' }}>
          
          <Login></Login>
        </div>
      </Container>
    </UserContext.Provider>

  );
}

export default App;
