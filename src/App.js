import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/layout/Layout.js';
import Home from './components/pages/Home.js';
import SignIn from './components/pages/signIn.js';
import ContactUs from './components/pages/ContactUs.js';
import PageNotFound from './components/pages/signIn.js';
import MyAccount from './components/pages/MyAccount.js';
import AssignmentsPage from './components/pages/assignments.js';
import Homework from './components/pages/Homework.js';
import Announcements from './components/pages/announcements.js';
import './App.css';
import { AuthProvider } from './components/auth/useAuth.js';
import ProtectedRouter from './components/auth/ProtectedRouter.js';



function App() {
  return (
  <BrowserRouter>
  <AuthProvider>
    <Layout>
      <Routes>  
        <Route path= '/signIn' element = {<SignIn />}/>
        <Route path= '/' element = {<ProtectedRouter><Home /></ProtectedRouter> }/>
        <Route path= '/myaccount' element = {<MyAccount />}/>  
        <Route path= '/homework' element = {<Homework />}/> 
        <Route path= '/assignments' element = {<AssignmentsPage />}/> 
        <Route path= '/announcements' element = {<Announcements />}/>  
        <Route path= '*' element = {<PageNotFound />}/> 
      </Routes>
    </Layout>
    </AuthProvider>
  </BrowserRouter>

  );
}

export default App;
