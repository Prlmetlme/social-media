import React, { useState, useEffect, useMemo, MouseEventHandler } from "react"

export function CropImage({setIsActive}: {setIsActive:Function }) {
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
          Names
          <input className="textbox" type="text" />
          <input className="textbox" type="text" />
        </div>
        <div className="container">
          Values
          <input className="textbox" type="text" />
          <input className="textbox" type="text" />
        </div>
        <div className="container">
          Extras
          <input className="textbox" type="text" />
          <input className="textbox" type="text" />
          <input style={{ backgroundColor: 'transparent', color: 'black', border: 'none' }} type="text" />
        </div>
      </div>
    </div>
  )
}