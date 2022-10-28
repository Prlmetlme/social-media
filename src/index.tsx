import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store'
import { checkVerification } from 'features/auth'

import './static/base.scss';

import App from './pages/index/App';
import Layout from './pages/layout/layout';
import Registration from './pages/register/register';
import Profile from './pages/user/user';
import APITest from './pages/test/testing';
import LoginPage from './pages/login/login';
import CreatePostPage from './pages/post/post'
import ThirdPersonProfile from 'pages/user/otherUser';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom' 

export default function Page() {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(checkVerification() as any)
    // console.log(document.cookie)
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}/>
          <Route index element={<App />}/>
          <Route path='register' element={<Registration />}/>
          <Route path='user' element={<Profile />}/>
          <Route path='user/:userID' element={<ThirdPersonProfile />}/>
          <Route path='test' element={<APITest />}/>
          <Route path='login' element={<LoginPage />}/>
          <Route path='newpost' element={<CreatePostPage />}/>
      </Routes>
    </BrowserRouter>
  )
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Page />
    </Provider>
  // </React.StrictMode>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


reportWebVitals();