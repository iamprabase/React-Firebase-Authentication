import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Header from './components/Header';

function App() {
  const [isAuhtenticated, setIsAuthenticated] = useState(false);
  
  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <Header title={isAuhtenticated?"Logged In":"Sign In"}/>

            <Form isAuhtenticated={isAuhtenticated} setIsAuthenticated={setIsAuthenticated}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
