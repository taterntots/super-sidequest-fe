import React from 'react';

// STYLING
import './App.css';

// COMPONENTS
import { Counter } from './features/counter/Counter';
import { User } from './features/user/User';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';

// ROUTING
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// ----------------------------------------------------------------------------------
// ----------------------------------- APP ------------------------------------------
// ----------------------------------------------------------------------------------

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/counter' component={Counter} />
        <Route path='/support' component={User} />
      </Switch>
    </>
  );
}

export default App;
