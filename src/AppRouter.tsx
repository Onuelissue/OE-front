import React from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import {
  Welcome,
  SignUp,
  SignIn,
} from './common/Views';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Welcome/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
    </Routes>
  </Router>
)

export default AppRouter;