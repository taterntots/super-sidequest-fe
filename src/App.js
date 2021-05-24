import React from 'react';

// STYLING
import './App.css';

// COMPONENTS
import Dashboard from './components/Dashboard';
import Login from './components/Auth/Login';

// ROUTING
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// ----------------------------------------------------------------------------------
// ----------------------------------- APP ------------------------------------------
// ----------------------------------------------------------------------------------

function App() {
  return (
    <div className='min-h-screen bg-sitewidebackground'>
      <Switch>
        <Route path='/' component={Dashboard} />
        {/* <Route path='/login' component={Login} /> */}
      </Switch>
    </div>
  );
}

export default App;
