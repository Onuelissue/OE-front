import React from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route } from 'react-router-dom';
import Welcome from './views/Welcome';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Welcome/>}/>
    </Routes>
  </Router>
)

export default AppRouter;