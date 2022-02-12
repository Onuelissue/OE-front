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
  MyPage,
  FindPassword,
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
      <Route path={RouteNames.MYPAGE} element={<MyPage/>}/>
      <Route path={RouteNames.FINDPASSWORD} element={<FindPassword/>}/>
    </Routes>
  </Router>
)

export default AppRouter;