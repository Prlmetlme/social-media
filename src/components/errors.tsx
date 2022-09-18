import { useState, useEffect } from "react"

export function User404() {
  return (
    <div>
      <h1 style={ {color: 'red'} }>Sorry</h1>
      <p>
        It seems this user does not exist. Please ensure you entered
        the correct URL.
      </p>
    </div>
  )
}

export function ServerDown({setIsActive}: {setIsActive:Function }) {
  const [scrollPos, setScrollPos] = useState(window.scrollY)


  useEffect(() => {
    disableScroll()
    window.addEventListener('scroll', handleScroll, {passive: true})

    return () => {
      enableScroll()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    setScrollPos(window.scrollY)
  }

  const disableScroll = () => {
    const body = document.body
    body.style.overflowY = 'hidden'
  }

  const enableScroll = () => {
    const body = document.body
    body.style.overflowY = 'scroll'
  }

  return (
    <div style={ {top: scrollPos}} className="modal" onClick={() => setIsActive(false)}>
      <div  className="popup" onClick={(e:React.MouseEvent) => e.stopPropagation()}>
        <div className="container">
          <div className="flex center">
            <h1>Oops</h1>
          </div>
          <p>It seems the server may be down.</p>
          <p>Please try again at another time</p>
        </div>
      </div>
    </div>
  )
}