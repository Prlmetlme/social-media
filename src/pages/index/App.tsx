import  Header from 'components/headers';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Post, RootState } from 'features/auth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { dateFormatter } from '../../features/formating'

function App() {
  const header = <Header color="orange"/>
  const [posts, setPosts] = useState([{} as Post])
  const [loaded, setLoaded] = useState(false)
  const { isAuthenticated } = useSelector((state:RootState) => state.user)
  const user = useSelector((state:RootState) => state.user.account)
  const [testValue, setTestValue] = useState('')

  const testFunction = (e:React.MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth)
    e.currentTarget.classList.toggle('ellipsis')
  }

  const minimalDate = (iso8601:string) => {
    const currentDate = new Date()
    const inputDate = new Date(iso8601)
    if (currentDate.toLocaleDateString() === inputDate.toLocaleDateString()) {
      console.log('Posted today')
      return dateFormatter(iso8601, 'time')
    }
    else {
      console.log('Not posted today')
      return dateFormatter(iso8601, 'date-time')
    }
  }

  const addClassIfOverflow = (e:HTMLElement) => {
    
  }

  useEffect(() => {
    if (!loaded) {
      axios
        .get('/api/engagements/viewselfposts')
        .then((res:any) => setPosts(res.data))
        .catch((err:any) => console.log(err))
        .finally(() => setLoaded(true))
      }
      else {
        console.log('The loaded function')
      }
  }, [posts, user])

  if (!isAuthenticated && loaded) return <Navigate to='/login' />
  return (
    <div className="page container">
      {header}
      <main>
        <h1>{user?.username}'s posts</h1>
        <div className='flex'> 
          {posts? <section className='v-flex'>
            { 
              posts.map((post) => {
                return (
              <article key={post.post_ID} className='v-flex center post-container' >
                <h2>{post.title}</h2>
                <div className='post-content ellipsis' onClick={testFunction}>
                  {post.content}
                </div>
                <p>Posted - {minimalDate(post.created)}</p>
              </article>
              )}
            )}
          </section> :
          <div style={ {marginRight: 'auto'} }>No posts found - why don't you try making one! </div>
          }
          <aside style={ {position: 'sticky', top: '0px', alignSelf: 'flex-start'} }>
            <span onClick={() => {window.history.go(-1)}}>{(dateFormatter(testValue, 'default'))}</span>
            <input type="text" className='textbox' onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setTestValue(e.target.value)}} />
          </aside>
        </div>
      </main>

    </div>
  );
}

export default App;
