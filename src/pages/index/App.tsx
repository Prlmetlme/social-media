import  Header from 'components/headers';
import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import axios from 'axios';
import { PaginatedRespone, Post, RootState } from 'features/auth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { dateFormatter } from '../../features/formating'
import { colorFunction } from '../../features/misc-functions'

interface Vote {
  type: 'post' | 'comment',
  vote: 'like' | 'dislike',
  id: string
}

function App() {
  const header = <Header color="orange"/>
  const [paginatedPosts, setPaginatedPosts] = useState({} as PaginatedRespone<Post>)
  const [posts, setPosts] = useState([{} as Post])
  const [loaded, setLoaded] = useState(false)
  const { isAuthenticated } = useSelector((state:RootState) => state.user)
  const user = useSelector((state:RootState) => state.user.account)
  const [testValue, setTestValue] = useState<any>('')
  const [sorted, setSorted] = useState(false)
  const [updatePosts, setUpdatePosts] = useState(false)

  const testFunction = (e:React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.offsetWidth < e.currentTarget.scrollWidth) {}
    console.log()
    e.currentTarget.classList.toggle('ellipsis')
  }
  

  // const sortFunction = (sortBy:React.ChangeEvent<HTMLInputElement>) => {
  const sortFunction = (sortBy:string) => {
    console.log('This log is used to see if there\'s an infinite loop or not')
    // switch (sortBy.currentTarget.value.toLowerCase()) {
    switch (sortBy.toLowerCase()) {
      case 'oldest first':
        setPosts([...posts].sort((a, b) => {return ( b['created'] > a['created']) ? -1 : 1}))
        break;
      case 'title a-z':
        setPosts([...posts].sort((a, b) => {return ( b['title'].toLowerCase() > a['title'].toLowerCase()) ? -1 : 1}))
        break;
      default:
        setPosts([...posts].sort((a, b) => {return ( b['created'] > a['created']) ? 1 : -1}))
    }
  }

  const minimalDate = (iso8601:string) => {
    const currentDate = new Date()
    const inputDate = new Date(iso8601)
    if (currentDate.toLocaleDateString() === inputDate.toLocaleDateString()) {
      return dateFormatter(iso8601, 'time')
    }
    else {
      return dateFormatter(iso8601, 'date-time')
    }
  }

  const addClassIfOverflow = (e:HTMLElement) => {
    
  }

  const handleVote = (voteBody:Vote) => {
    console.log(voteBody)
    axios
      .post('/api/engagements/vote', voteBody)
      .then((res:any) => console.log(res))
      .catch((err:any) => console.log(err))
  }

  useEffect(() => {
    if (!loaded || user || updatePosts) {
      console.log('Function called')
      axios
        .get('/api/engagements/viewselfposts')
        .then((res:any) => {setPosts(res.data.results); console.log('Posts updated'); setUpdatePosts(false);})
        .catch((err:any) => console.log(err))
        .finally(() => setLoaded(true))
      }
      else {
        let sortedPosts = [...posts].sort((a, b) => {return ( b['created'] > a['created']) ? 1 : -1})
        setPosts(sortedPosts)
      }
  }, [user, updatePosts])

  useEffect(() => {
    if (!sorted && loaded) {
      sortFunction('')
      console.log()
    }
  }, [sorted, loaded])

  if (!isAuthenticated && loaded) return <Navigate to='/login' />
  return (
    <div className="page container">
      {header}
      <main>
        <h1>{user?.username}'s posts {`${process.env.REACT_APP_API_URL}`}</h1>

        <div className='flex'>
          {posts? <section className='v-flex'>
            { 
              posts.map((post) => {
                return (
              <article key={post.post_ID} className='v-flex center post-container' >
                <img src="./close.svg" alt="" onClick={(e:React.MouseEvent<HTMLImageElement>) => {}}/>
                <h2>{post.title}</h2>
                <div className='post-content ellipsis' onClick={testFunction}>
                  {post.content}
                </div>
                <button style={ {width: 'fit-content'} } onClick={e => {handleVote({type: 'post', vote: 'like', id: post.post_ID}); setUpdatePosts(true);}}>Like</button>
                <button style={ {width: 'fit-content'} } onClick={e => {handleVote({type: 'post', vote: 'dislike', id: post.post_ID}); setUpdatePosts(true);}}>Dislike</button>
                <button style={ {width: 'fit-content'} } onClick={() => {}}>Comment</button>
                <p style={ { color: `${colorFunction(post.likes)}`} } >Likes: {post.likes}</p>
                <p>Posted - {minimalDate(post.created)}</p>
              </article>
              )}
            )}
          </section> :
          <div style={ {marginRight: 'auto'} }>No posts found - why don't you try making one! </div>
          }
          <aside style={ {position: 'sticky', top: '0px', alignSelf: 'flex-start'} }>
            {/* <span onClick={() => {window.history.go(-1)}}>{(dateFormatter(testValue, 'time'))}</span> */}
            <span onClick={() => {window.history.go(-1)}}>{testValue}</span>
            <input type="text" className='textbox' onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setTestValue(() => {return (parseInt(e.target.value, 16))})}} />
          </aside>
        </div>
      </main>

    </div>
  );
}

export default App;
