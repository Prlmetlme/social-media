import { useParams } from "react-router-dom"
import axios from "axios"
import { useState, useLayoutEffect } from "react"
import { User404 } from "components/errors"
import { User } from "features/auth"
import Header from "components/headers"

function ThirdPersonProfile() {
  const params = useParams()
  const [statusCode, setStatusCode] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState({} as Partial<User>)

  useLayoutEffect(()=> {
    axios
      .post( '/api/engagements/profileview', params)
      .then((res:any) => {
        console.log(res)
        // setStatusCode(res.status)
        setStatusCode(true)
        setUser(res.data)
      })
      .catch((err:any) => {
        console.log(err)
        setStatusCode(false)
      });
    setLoaded(true)
  }, [])
  return (
    <div className='page'>

      <div onClick={(e:React.MouseEvent) => console.log(statusCode)}>{params.userID}</div>
      {loaded && statusCode ? (
      <div>
        <Header color='orange'/>
        <div className='flex center'>
          <h1>{user.username}</h1>
        </div>
        <div className=''>
          Birthday: {user.password? user.password: 'No password on record' }
          Email:  {user.email}
        </div>
      </div>
      )
    :
    ( <User404 /> )}
    </div>
  )
}

export default ThirdPersonProfile