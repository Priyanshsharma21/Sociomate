import React, { useRef, useState } from 'react'
import {Row, Col} from 'antd'
import { LoginLoader } from './PreLoader.jsx'
import { Button, Modal } from 'antd';
import { FcStackOfPhotos } from 'react-icons/fc'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    content : "",
    photo : "",
    tags : []
  })
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false)
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) 
  const {VITE_URL} = import.meta.env


  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      // console.log(formData)
      setLoader(true)
      const postBody = {
        ...formData,
        user : user._id
      }

      // console.log()

        const options = {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }

        const res = await axios.post(`${VITE_URL}/posting`,postBody, options)

        if (res.status === 201 && res.data.status === true) {
          // Post created successfully, reload the page
          setLoader(false)
          window.location.reload();
        }
        
    } catch (error) {
      alert(error.message)
    }
  }

  const handleChange = (e)=>{
    const { name, value, files } = e.target

    if (name === 'photo') {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = () => {
        setFormData({ ...formData, photo: reader.result });
      };
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleTagChange = (e) => {
    const { value } = e.target;
    const tagsArray = value.split(',').map((tag) => tag.trim().toLowerCase())
    setFormData({ ...formData, tags: tagsArray });
  };

  return (
    <div className="w-full create_post">
      <Row>
          <Col span={2} className="flex justify-center items-center">
              <Link to={`/profile/${user?._id}`} className="img_feed_user rounded-full w-[40px] h-[40px]">
              <LazyLoadImage
                  effect="blur" // Adds the blur effect while the image is loading
                  src="https://source.unsplash.com/1600x900/?face" // The image source
                  alt="image_url"
                  className="rounded-full w-[40px] h-[40px]"
                />
              </Link>
          </Col>

          <Col span={22}>
              <div className="create_me p-5">
                <form onSubmit={handleSubmit} className="flex flex-col">

                  <textarea type="text" autoFocus placeholder='Start a Post' required className="input_create" name="content" onChange={handleChange} />


                  <input required className="form_create_inp" type="text" onChange={handleTagChange} name="tags" placeholder="Enter Tags (comma-separated)" />

                  <div className="flex cursor-pointer mt-3 ml-3" onClick={() => setOpen(true)}>
                      <div className="photo">
                        <FcStackOfPhotos className='photo_main'/>
                      </div>
                      <div className="photo_text ml-1">
                        Photo
                      </div>
                  </div>

                  

                    <Modal
                      title=""
                      centered
                      open={open}
                      onCancel={() => setOpen(false)}
                      width={300}
                      className='todomodel'
                  >
                   <input type="file" className="mt-3 ml-3 rounded-sm input_main_text" onChange={handleChange} name="photo" />
                  </Modal>

                  


                    <button type='submit' className="btn_main_create_submit">
                      {loader ? (
                          <LoginLoader />
                      ):(
                          <>Post</>
                      )}
                    </button>
                </form>
              </div>
          </Col>
      </Row>
    </div>
  )
}

export default CreatePost