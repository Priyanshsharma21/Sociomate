import React, { useState } from 'react'
import withContainer from '../hof/Hof';
import {Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom';
import { BsFillPencilFill, BsPencil } from 'react-icons/bs'
import { Button, Modal } from 'antd';
import { LoginLoader } from '../components/PreLoader.jsx'
import axios from 'axios'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) 
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false)
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    name : user.name,
    email : user.email,
    mobile : user.mobile,
    bio : user.bio ? user.bio : ""
  })

  // console.log(user)

  const handleLogout = async()=>{
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate('/auth')
    } catch (error) {
      alert(error.message)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true)
    try {
      const { _id } = user
      const { name, email, mobile, bio } = formData
      const {VITE_URL} = import.meta.env

      const options = {
        headers: {
            'Authorization': `Bearer ${token}`
          }
      }

      const res = await axios.put(`${VITE_URL}/profileUpdate/${_id}`, {
        name,
        email,
        mobile,
        bio,
      },options);

      // Handle success or display appropriate message
      console.log('Profile updated successfully:', res.data);
      localStorage.setItem('user', JSON.stringify(res.data.data))
      if(res.data.status === true){
        alert("Profile Updated Successfully")
      }
      setLoader(false)

      // Close the modal
      setOpen(false);
    } catch (error) {
      setLoader(false)
      console.error('Error updating profile:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const formatBioText = (bio) => {
    if (bio) {
      return bio
        .split('.')
        .map((sentence) => {
          const words = sentence.trim().split(' ');
          const formattedWords = words.map((word) =>
            word.length > 1 ? word[0].toUpperCase() + word.slice(1) : word.toUpperCase()
          );
          return formattedWords.join(' ');
        })
        .join('. ');
    }
    return '';
  };

  // console.log(user)

  return (
    <div className='profile'>
     <Row className="profile_main_row">
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
         
         <div className="left_profile_top flex">
         <div className="edit_user_profile flex justify-center items-center" onClick={() => setOpen(true)}>
            <BsFillPencilFill className="user_pen_edit text-white mr-3 cursor-pointer"/>
         </div>

                  <Modal
                      title=""
                      centered
                      open={open}
                      onCancel={() => setOpen(false)}
                      width={300}
                      className='todomodel'
                  >
                    <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form_profile_edit_model"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form_profile_edit_model"
                  />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    className="form_profile_edit_model"
                  />
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="form_profile_edit_model"
                    placeholder="Enter your bio...."
                  ></textarea>
                  <button className='btn_profile_update_submit' type="submit">
                  {loader ? (
                          <LoginLoader />
                      ):(
                          <>Submit</>
                      )}
                  </button>
                </form>
                  </Modal>


          <div className="logout ml-5" onClick={handleLogout}>
          <button class="Btn" >
              <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
              
              <div class="text">Logout</div>
            </button>
          </div>
         </div>


        </div>
      </Col>

      <Col span={24}>
        {user.bio && (
          <div className="user_bio">
             {formatBioText(user.bio)}
          </div>
        )}
      </Col>
     </Row>

      
    </div>
  )
}

export default withContainer(Profile);