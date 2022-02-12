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
  Complete,
} from './common/Views';
import {
  RouteNames
} from './constants';
const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Welcome/>}/>
      <Route path={RouteNames.SIGN_UP} element={<SignUp/>}/>
      <Route path={RouteNames.SIGN_IN} element={<SignIn/>}/>
      <Route path={RouteNames.COMPLETE} element={<Complete/>}/>
    </Routes>
  </Router>
)

export default AppRouter;