import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './auth/signIn';
import SignUp from './auth/signUp';
import Header from './component/header';
import HeroDetail from './component/heroDetail';
import MyProfile from './component/profile';
import Layout from './containers';
import PrivateRoute from './containers/privateRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Layout />}></Route>
          <Route path='/hero/:id' element={<HeroDetail />}></Route>
          <Route path='/sign-in' element={<SignIn />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/my-profile' element={<PrivateRoute />}>
            <Route path='/my-profile' element={<MyProfile />}></Route>
          </Route>
          <Route path="*" element={ <Navigate to="/" /> }></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
