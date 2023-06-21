import React, { useEffect, useState } from 'react';
import withContainer from '../hof/Hof';
import { Row, Col } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import { Button, Modal } from 'antd';
import { LoginLoader, PreLoader } from '../components/PreLoader.jsx';
import axios from 'axios';
import { ProfilePost } from '../components';

const Profile = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const token = localStorage.getItem('token');
  const [postLoader, setPostLoader] = useState(false);
  const [user, setUser] = useState(null)
  const loggedInuser = JSON.parse(localStorage.getItem('user')) 
  const [connected, setConnected] = useState(false);

  // console.log(connected)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    bio: '',
    slink: '',
  });




  useEffect(() => {
    const getUserData = async () => {
      try {
        const { VITE_URL } = import.meta.env;
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };

        const res = await axios.get(`${VITE_URL}/user/${uid}`, options);
        if (res.data.status === true) {
          const user = res.data.data;
          setFormData({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            bio: user.bio ? user.bio : '',
            slink: user.slink ? user.slink : '',
          });

          setUser(res.data.data)
          if(res.data.data.connections.includes(loggedInuser?._id)){
            setConnected(true)
          }else(
            setConnected(true)
          )
        } else {
          alert('Something Went Wrong');
        }
      } catch (error) {
        alert(error.message);
      }
    };

    getUserData();
  }, [uid,connected]);


  const handleConnection = async () => {
    try {
      const { VITE_URL } = import.meta.env;
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };


      const res = await axios.put(`${VITE_URL}/connections/${loggedInuser._id}/${uid}`, {}, options);
      if (res.data.status === true) {
        setUser(res.data.data)
        if(res.data.status === 'Connection added'){
          setConnected(true);
        }else{
          setConnected(false);
        }
        alert(res.data.message)
      } else {
        alert('Something Went Wrong');
      }
    } catch (error) {
      alert(error.message);
    }
  };


  // console.log(user)


  useEffect(() => {
    const getPosts = async () => {
      try {
        setPostLoader(true);
        const { VITE_URL } = import.meta.env;
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };

        const res = await axios.get(`${VITE_URL}/postbyuser/${uid}`, options);
        if (res.data.status === true) {
          setPostLoader(false);
          setUserPosts(res.data.data);
        } else {
          setPostLoader(false);
          alert('Something Went Wrong');
        }
      } catch (error) {
        alert(error.message);
      }
    };

    getPosts();
  }, [uid]);



  // useEffect(() => {
  //   if (loggedInuser && user) {
  //     console.log(user.connections)
  //     setConnected(user.connections.includes(loggedInuser._id));
  //   }
  // }, [loggedInuser, user])




  const handleLogout = async () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/auth');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { _id } = user;
      const { name, email, mobile, bio, slink } = formData;
      const { VITE_URL } = import.meta.env;

      const options = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const res = await axios.put(`${VITE_URL}/profileUpdate/${_id}`, {
        name,
        email,
        mobile,
        bio,
        slink,
      }, options);

      // Handle success or display appropriate message
      localStorage.setItem('user', JSON.stringify(res.data.data));
      if (res.data.status === true) {
        alert('Profile Updated Successfully');
      }
      setLoader(false);

      // Close the modal
      setOpen(false);
    } catch (error) {
      setLoader(false);
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

  return (
    <div className='profile'>
      <Row className="profile_main_row">
        <Col span={24}>
          <div className="profile_pic w-full ">
            <img loading="lazy" className="h-[200px] w-full rounded-sm" src="https://source.unsplash.com/1600x900/?motivation" alt="natureBg" />

            <div className="absolute img_profile_pic">
              <img loading="lazy" className="rounded-full img_pro" src="https://source.unsplash.com/1600x900/?face,clay,cartoon,illustration" alt="anime" />
            </div>
          </div>

          <div className="profile_details flex justify-between items-center">
            <div className="name_on_profile">
              {formData.name && formData.name.toUpperCase()}
            </div>

            <div className="left_profile_top flex">
                  {loggedInuser?._id === uid && (
                    <div className="edit_user_profile flex justify-center items-center" title="Edit Profile" onClick={() => setOpen(true)}>
                      <BsFillPencilFill className="user_pen_edit text-white mr-3 cursor-pointer" />
                    </div>
                  )}

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
                  <input
                    type="text"
                    name="slink"
                    placeholder='Website, Social Media Link (optional)'
                    value={formData.slink}
                    onChange={handleInputChange}
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
                      ) : (
                        <>Submit</>
                      )}
                    </button>
                </form>
              </Modal>

              {loggedInuser?._id === uid && (
                <div className="logout ml-5" onClick={handleLogout}>
                  <button class="Btn" >
                    <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

                    <div class="text">Logout</div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </Col>

        <Col span={24}>
          {formData.bio && (
            <div className="user_bio">
              {formatBioText(formData.bio)}
            </div>
          )}

          {formData.slink && (
            <div className="user_slink mt-5">
              <a className="text-blue-400 font-semibold a_of_profile" target="_blank" rel="noopener noreferrer" href={formData.slink}>Website</a>

              <a className="text-blue-400 font-semibold ml-5 a_of_profile" target="_blank" rel="noopener noreferrer" href={`mailto:${formData.email}`}>Contact</a>
            </div>
          )}

          <div className="user_slink mt-5 flex">
            <div className="text-blue-400 font-semibold a_of_profile cursor-pointer">
              {user?.connections.length} followers
            </div>
            <div className="text-blue-400 font-semibold a_of_profile ml-5 cursor-pointer">
              {user?.connections.length} connections
            </div>
          </div>

          <div className="follow_btn_main mt-5">
            {loggedInuser?._id !== uid && (
              <button className="follow_btn ml-3" onClick={handleConnection}>
                {user?.connections?.includes(loggedInuser?._id) ? 'Connected' : "Connect"}
              </button>
            )}
        </div>
        </Col>
      </Row>

      <Row className="profile_main_row mt-10">
        <Col span={24}>
          <div className="nav_of_profile_posts flex justify-between items-center">
            <div className="messagenfollowers">
              <div className="activity font-semibold text-white">Activity</div>
              <div className="text-blue-400 font-semibold a_of_profile cursor-pointer mt-3">
                {user?.connections.length} followers
              </div>
            </div>


            {loggedInuser?._id === uid && (
              <div className="create_a_post">
                <Link className="profile_create_post" to={'/'}>Create a Post</Link>
              </div>
              )}
          </div>

          {postLoader ? (
            <div className="preloader-div">
              <PreLoader />
            </div>
          ) : (
            <div className="profile-post-list">
              {userPosts.map((post) => (
                <ProfilePost key={post._id} post={post} />
              ))}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default withContainer(Profile);