import React from 'react'
import withContainer from '../hof/Hof';
import {Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) 
  const navigate = useNavigate()

  const handleLogout = async()=>{
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate('/auth')
    } catch (error) {
      alert(error.message)
    }
  }


  return (
    <div className='profile'>
     <Row>
      <Col span={24}>
        <div className="profile_pic w-full ">
          <img className="h-[200px] w-full rounded-sm" src="https://source.unsplash.com/1600x900/?motivation" alt="natureBg" />

          <div className="absolute img_profile_pic">
            <img className="rounded-full img_pro" src="https://source.unsplash.com/1600x900/?face" alt="anime" />
          </div>
        </div>

        <div className="profile_details flex justify-between items-center">
          <div className="name_on_profile">
            {user?.name.toUpperCase()}
          </div>
         <div className="logout" onClick={handleLogout}>
         <button class="Btn" >
            <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            
            <div class="text">Logout</div>
          </button>
         </div>


        </div>
      </Col>
     </Row>

      
    </div>
  )
}

export default withContainer(Profile);