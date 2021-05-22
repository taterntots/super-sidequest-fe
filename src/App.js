import React from 'react';

// STYLING
import './App.css';

// COMPONENTS
import { Counter } from './features/counter/Counter';
import { User } from './features/user/User';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import GamesPage from './components/GamesPage';

// ROUTING
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// ----------------------------------------------------------------------------------
// ----------------------------------- APP ------------------------------------------
// ----------------------------------------------------------------------------------

function App() {
  return (
    <div className='min-h-screen bg-sitewidebackground'>
      <NavBar />
      <Switch>
        <div className='mx-10'>
          <Route exact path='/' component={HomePage} />
          <Route path='/games' component={GamesPage} />
          <Route path='/counter' component={Counter} />
          <Route path='/support' component={User} />
        </div>
      </Switch>
    </div>
  );
}

export default App;
