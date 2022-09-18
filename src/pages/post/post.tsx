import Header from "components/headers"
import React, { useRef, useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


function CreatePostPage() {

  const isAuthenticated = useSelector((state:any)=> state.user.isAuthenticated)
  const loading = useSelector((state:any)=> state.user.loading)

  const submitPost = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
          // @ts-ignore
    const test = e.currentTarget.elements as HTMLInputElement[]
    // console.log(e.currentTarget.elements[0])
    // console.log(test[1].name)
    let forms: {[x:string]: any} = {};
    for (let i = 0; i < test.length; i++) {
      if (test[i].value) { 
        forms[test[i].name] = test[i].value
      }    
    }
    axios
      .post( '/api/engagements/userpost', forms)
      .then((res) => {console.log(res)})
      .catch((err:any) => {console.log(err)})
  }

  const postForm = useRef(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  },[])

  if (!isAuthenticated && !loading) return <Navigate to='/login'/>;
  
  return (
    <div className="page container">
      <Header color='orange' />
      <form action="" onSubmit={submitPost}>
        <div ref={postForm} className="wrapper container">
          <div className="wrapper">
              <label htmlFor="title">Title</label>
            <input className="textbox" type="text" name="title" id="title" /></div>
          </div>
          <div className="wrapper">  
              <label htmlFor="content">Content</label>
            <textarea className="text-field" name="content" id="content" cols={30} rows={10} placeholder='Enter your post content here'>
            </textarea>
          </div>
          <div className="container">
            <button type="submit">Submit</button>
          </div>
      </form>
    </div>
  )
}

export default CreatePostPage