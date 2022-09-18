import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../features/auth';
import  Header from 'components/headers';
import { Navigate } from 'react-router-dom';

const head = <Header color="orange"/>

function LoginPage() {
  const { isAuthenticated } = useSelector((state:any) => state.user)
  const [ passwordToggle, setPasswordToggle ] = useState('password')

  const dispatch = useDispatch();
  const loginForm = useRef(null);

  const submit = (e:React.FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const username = form['username'].value
    const password = form['password'].value

    // const request = {
    //   username: username,
    //   password: password,
    // }

    dispatch( login({ username, password }) as any)
  }
  if (isAuthenticated) return <Navigate to='/user' />;

  return (
    <div className="page container">
      {head}
      <form action="" className="register-form container" ref={loginForm} onSubmit={submit}>
        <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" className="textbox" placeholder="Username" />
        <label htmlFor="password">Password</label>
          <input type={passwordToggle} name="password" id="password" className="textbox" placeholder="Password" />
          <button type="submit">Login</button>
          <button onClick={(e:any) => {e.preventDefault(); if (passwordToggle === 'text') {setPasswordToggle('password')} else {setPasswordToggle('text')} }}>Show</button>
      </form>
    </div>
  )
}


export default LoginPage