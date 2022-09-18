import { Navigate } from 'react-router-dom'
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { User } from "features/auth"
import Header from 'components/headers'
import { dateFormatter, snakeCaseToCapital } from 'features/formating'
import { CropImage } from 'components/modals'
import { RootState } from 'features/auth'


export default function Profile() {
  const account:User = useSelector((state:any) => state.user.account)
  const loading = useSelector((state:RootState) => state.user.loading)
  const isAuthenticated = useSelector((state:RootState) => state.user.isAuthenticated)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const head = <Header color='orange' />
  const dontShow:Array<string> = ['profile_picture', 'phone', 'is_superuser', 'is_active', 'bio', 'is_staff', 'last_active']

  useEffect(() => {
    setPageLoaded(true)
    // @ts-ignore
    // Object.keys(account).map((keys) => {console.log(keys)})
  }, [account]
  )

const phoneFormat = (phoneNumber:string) => {
  return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)} - ${phoneNumber.substring(6, 10)}`
}

if (!isAuthenticated && !loading) {return <Navigate to='/login' />}

return ( 
  <div className="page container">
    <Header color='orange' />
    {{pageLoaded} && 
    <div>
      { account?.banner_image }
      <div>
        <div>
          <div className='profile-picture-container'>
            { account?.banner_image ? <img src={account?.banner_image} alt="" /> :
            <img style={ {width: '100%', height: 'fit-content'} } src="https://assets.tumblr.com/images/default_header/optica_pattern_09.png" alt="" /> }
          </div>
          { 
            account?.profile_picture ?
            <div>
              <a href='' className='profile-picture-cover'>Edit</a>
              <img className='profile-picture' src={account?.profile_picture} alt="" />
            </div>
            :
            <div className='profile-picture-container' >
              <a href='' onClick={(e:React.MouseEvent<HTMLElement>) => { e.preventDefault(); setShowModal((prev) => !prev); e.currentTarget.blur(); }} className='profile-picture-cover'>Edit</a>
              <img className='profile-picture' src="https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png" alt="" />
            </div>
          }
        </div>
        <div style={{backgroundColor: 'purple', padding: '.75rem', borderRadius: '1rem' }} >
          <div>Username: { `${account?.username}` }</div>
          <div>Bio: { account?.bio ? `${phoneFormat(account?.bio)}` : 'Let others know about you - enter a bio now' }</div>
        </div>
        <ul className='nav-list'>
          <li>
            <div   style={{borderBottom: '2px black solid'}} className='flex'>Email:  
                  <span style={ {marginLeft: 'auto'} }>{ `${account?.email}` }</span>
            </div>
          </li>
          <li>
            <div   style={{borderBottom: '2px black solid'}} className='flex'>Date of account creation  
                  <span style={ {marginLeft: 'auto'} }>{ `${dateFormatter(account?.date_joined, 'date')}` }</span>
            </div>
          </li>
          <li>
            <div   style={{borderBottom: '2px black solid'}} className='flex'>First name:  
                  <span style={ {marginLeft: 'auto'} }>{ account?.first_name ? `${account?.first_name}` : '' }</span>
            </div>
          </li>
          <li>
            <div   style={{borderBottom: '2px black solid'}} className='flex'>Last name:  
                  <span style={ {marginLeft: 'auto'} }>{ account?.last_name ? `${account?.last_name}` : '' }</span>
            </div>
          </li>
          <li>
            <div   style={{borderBottom: '2px black solid'}} className='flex'>Birthday:  
                  <span style={ {marginLeft: 'auto'} } >{ account?.birthday ? `${dateFormatter(account?.birthday, 'date')}` : '' }</span>
            </div>
          </li>
          <li>
            <div   style={{borderBottom: '2px black solid'}} className='flex'>Phone Number:  
                  <span style={ {marginLeft: 'auto'} }>{ account?.phone ? `${phoneFormat(account?.phone)}` : '' }</span>
            </div>
          </li>
          <li>
            <div   style={{borderBottom: '2px black solid'}}>Occupation:  
                  <span style={ {marginLeft: 'auto'} }>{ account?.occupation ? `${account?.occupation}` : '' }</span>
            </div>
          </li>
        </ul>
        { showModal && (<CropImage setIsActive={setShowModal}/>)}
      </div>
    </div>
    }
  </div>
)}