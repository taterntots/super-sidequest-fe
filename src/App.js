import React from 'react';

// ROUTING
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Dashboard from './components/Dashboard';
import ScrollToTop from './components/utils/ScrollToTop';

// STYLING
import './App.css';

// ----------------------------------------------------------------------------------
// ----------------------------------- APP ------------------------------------------
// ----------------------------------------------------------------------------------

function App() {
  return (
    <div className='min-h-screen bg-sitewidebackground'>
      <ScrollToTop />
      <Switch>
        <Route path='/' component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
