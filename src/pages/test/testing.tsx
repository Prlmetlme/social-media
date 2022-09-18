import Header from 'components/headers';

function APITest() {
  return (
  <div className="page container">
    <Header color='orange' />
    <div className="flex title">
      API Endpoint testing
    </div>

    <div className='container dlex'>
      <div className="container">
        Username:
        <input type="text" name="" id="" className='textbox'/>
      </div>
      <div className="container">
        Password:
        <input type="text" name="" id="" className='textbox'/>
      </div>
    
    <div className="container">
      Input: 
      <input type="text" name="" id="" className='textbox'/>
    </div>
    </div>
    <div className='test-profile-container'>
      <div className='test-profile-cover'>Edit</div>
      <img className='test-profile' src="https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png" alt="" />
    </div>
    <div>
    </div>
  </div>
  );
}


export default APITest