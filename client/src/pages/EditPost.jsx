import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Modal } from 'antd';
import { FcStackOfPhotos } from 'react-icons/fc'
import { LoginLoader } from '../components/PreLoader';
import withContainer from '../hof/Hof';


const EditPost = () => {
    const {postId} = useParams()
    const [formData, setFormData] = useState({
        content : "",
        photo : "",
        tags : []
    })
    const [loader, setLoader] = useState(false)
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'))
    const {VITE_URL} = import.meta.env
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        const fetchPostDetails = async()=>{
            try {

                const options = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                      }
                }

                const res = await axios.get(`${VITE_URL}/post/${postId}`,options)

                if(res.data.status===true){
                    setFormData({
                        content: res.data.data.content,
                        tags: res.data.data.tags,
                        photo: '',
                      });
                }else{
                    alert("Something Went Wrong")
                }

            } catch (error) {
                alert(error.message)
            }
        }

        fetchPostDetails()
    },[])


    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
          // console.log(formData)
          setLoader(true)
          const postBody = {
            ...formData,
            user : user._id
          }

    
            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            }
    
            const res = await axios.put(`${VITE_URL}/postUpdate/${postId}`,postBody, options)
    
            if (res.data.status === true) {
              setLoader(false)
              window.location.reload();
            }
            
        } catch (error) {
          setLoader(false)
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
        const tagsArray = value.split(',').map((tag) => tag.trim());
        setFormData({ ...formData, tags: tagsArray });
      };

  return (
    <div className="editpost w-full h-screen flex flex-col justify-center items-center">

    <div className="editPostText">
        EDIT POST
    </div>
        <div className="editCard">
        <form onSubmit={handleSubmit} className="flex flex-col">
            <textarea type="text" autoFocus placeholder='Start a Post' required className="input_create" value={formData?.content} name="content" onChange={handleChange} />


            <input value={formData?.tags} required className="form_create_inp" type="text" onChange={handleTagChange} name="tags" placeholder="Enter Tags (comma-separated)" />

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
                    <>Submit</>
                )}
            </button>
            </form>
        </div>
    </div>
  )
}

export default withContainer(EditPost)