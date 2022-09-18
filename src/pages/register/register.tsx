import './registration.scss'
import { Navigate } from 'react-router-dom';
import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../features/auth';
import Header from 'components/headers';
import { isDigit } from 'features/misc-functions';
import { PhoneNumberInput } from 'components/inputs';


export default function Registration() {
  const dispatch = useDispatch();
  const { registered, loading, isAuthenticated } = useSelector((state:any)=> state.user);

  const passwordInput = useRef(null)
  const [passwordType, setPasswordType] = useState('password')
  const Now = new Date()
  const currentDate = Now.toISOString().split('T')[0]
  const maxDate = new Date(Now.setUTCFullYear(Now.getFullYear() - 125 )).toISOString().split('T')[0]

  const showPassword = (e:React.MouseEvent) => {
    e.preventDefault()
    const self = e.target as HTMLElement
    if (passwordType === 'password') {
      setPasswordType('text')
      self.innerHTML = 'Hide'
    }
    else {
      setPasswordType('password')
      self.innerHTML = 'Show'
    }
  }

  const submit = (e: any) => {
    e.preventDefault()
    const array = e.target
    let Form = {}
    for (let i = 0; i < array.length; i++) {
      if (array[i].name && array[i].name && array[i].value){
        let attribute:keyof Object = array[i].name 
        if (array[i].name === 'phone') {
          const cleanPhone = array[i].value.replaceAll(' ', '').replaceAll('-', '')
          Form[attribute] = cleanPhone
        }
        if (array[i].name !== 'phone') {
          Form[attribute] = array[i].value
        }
      }
    }

    dispatch(register( Form ) as any)
  }

  if (registered) return <Navigate to='/user' />;

  return (
    <div className="page container">
      <Header color='orange'>Dub</Header>
      <form className="flex flex-col container register-form" action="" onSubmit={submit}>
        <div onClick={() => console.log(maxDate)}>
          console.log
        </div>

        <div className="wrapper">

          <div className="wrapper">
            <label htmlFor="username">Username: <div className='required'>*</div> </label> 
              <input name='username' id="username" className="textbox" type="text" placeholder='JohnDoe' required />
            <label htmlFor="password">Password: <div className='required'>*</div> </label>
              <input name='password' ref={passwordInput} id="password" className="textbox" placeholder='Password' type={passwordType} autoComplete='new-password' required />
              <div className='flex center'><button onClick={showPassword} className='button'>Show</button></div>
          </div>
          <div className="wrapper">
            <label htmlFor="firstname">First Name: </label>
              <input name='first_name' id="firstname" className="textbox" type="text" placeholder='John' />
            <label htmlFor="lastname">Last Name: </label>
              <input name='last_name' id="lastname" className="textbox" type="text" placeholder='Doe' />
          </div>
        <div>
          <button className='button-primary' type="submit">Register</button>
        </div>
        </div>
        <div className="wrapper">
          <div className="wrapper">
            <label htmlFor="occupation">Occupation: </label>
              <input className='textbox' type="text" name='occupation' id='occupation' placeholder='Web Developer' />
            <label htmlFor="birthday">Birthday: </label>
              <input name="birthday" type="date" className='textbox' id="birthday" min={maxDate} max={currentDate} />
          </div>
        </div>

        <div className="wrapper">
          <div className="wrapper">
            <label htmlFor="email">Email: <div className='required'>*</div> </label>
              <input className='textbox' type="email" name="email" id="email" placeholder='johndoe@provider.com' required />
            <label htmlFor="phone">Phone number: </label>
              <PhoneNumberInput />
          </div>
        </div>
      </form>
    </div>
  )
}
