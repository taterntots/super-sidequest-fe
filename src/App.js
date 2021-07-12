import React from 'react';

// STYLING
import './App.css';

// COMPONENTS
import Dashboard from './components/Dashboard';

// ROUTING
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// UTILS
import ScrollToTop from './components/utils/ScrollToTop';

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
