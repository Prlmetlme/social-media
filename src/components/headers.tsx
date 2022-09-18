import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from 'features/auth';
import React, { useState } from 'react';
import axios from 'axios';
import { User } from 'features/auth';
import { ServerDown } from './errors' 

function Header(props:any) {
  const dispatch = useDispatch()
  const { isAuthenticated, registered } = useSelector((state:any) => state.user)
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(false)
  const [serverDwon, setServerDown] = useState(false)
  let queryTimer:any = null

  const queryUserbase = (e:React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(queryTimer)
    queryTimer = setTimeout(() => {
      const pattern = e.target.value
      if (pattern) {
      setLoading(true);
      axios
        .get(`http://localhost:8000/accounts/all/${pattern}`)
        .then((res:any) => setUserList(res.data))
        .catch((err:any) => {console.log(err.code); setServerDown(true)})
        .finally(() => setLoading(false))
      }
      else setUserList([])
    }, 600)
  }
  return (
    <header className='header' style={ { backgroundColor: `${props.color}`, color: 'black' } }>
      <nav>
        <ul className='nav-list'>
          <li><a className='to-top' href="">Scroll to top</a></li>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/test">Testing</NavLink></li>
          { isAuthenticated && ( <li><NavLink to="/user">Profile</NavLink></li> )}
          { isAuthenticated && ( <li><a onClick={() => {dispatch(logout() as any)}} href="#">Logout</a></li> )}
          { isAuthenticated && ( <li><NavLink to="/newpost">Post</NavLink></li> )}
          { !isAuthenticated && ( <li><NavLink to="/login">Login</NavLink></li> )}
          { (!isAuthenticated && !registered) && ( <li><NavLink to="/register">Register</NavLink></li> )}
        </ul>
      </nav>
        <div className='container'>
          <label htmlFor="user-search">Search for a user: </label>
                <input onChange={queryUserbase} id='user-search' className='textbox' type='search' />
          <div className='gray-scroll' >
            {
              !loading ? (userList.map((user: User) => {
                return (
                <div key={user.static_user_id}>
                  <a href={`http://localhost:3000/user/${user.static_user_id}`}>
                   {user.username}
                  </a>
                </div>
                )
              })) : (
              <div className="spinner-container">
                <div className="smt-spinner-circle">
                  <div className="smt-spinner"></div>
                </div>
              </div>
              )}
          </div>
        </div>
        {serverDwon && <ServerDown setIsActive={setServerDown} /> }
    </header>
  )
}

export default Header