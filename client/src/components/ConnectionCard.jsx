import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const ConnectionCard = ({user}) => {
    const [connected, setConnected] = useState(false);
    const token = localStorage.getItem('token');
    const loggedInuser = JSON.parse(localStorage.getItem('user')) 

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

    //   console.log(user)


      const handleConnection = async (uid) => {
        try {
          const { VITE_URL } = import.meta.env;
          const options = {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          };
    
    
          const res = await axios.put(`${VITE_URL}/connections/${loggedInuser._id}/${uid}`, {}, options);
          if (res.data.status === true) {
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
      
      
  return (
    <div className="connectionCard">
        <Link to={`/profile/${user?._id}`} className="flex flex-col w-full card_user rounded-xl card_connection_wala relative">
        <div className="banner_home_card relative">
          <img loading="lazy" className="object-cover w-full h-full rounded-xl" src="https://source.unsplash.com/1600x900/?nature,photography,technology" alt="home_card" />

          <div className="img_profile rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <img loading="lazy" className="object-cover w-full h-full rounded-full" src="https://source.unsplash.com/1600x900/?nature" alt="home_card" />
          </div>
        </div>

        <div className="user_info flex flex-col items-center">
            <div className="name_home_card mt-2">{user.name.toUpperCase()}</div>

            {user.bio && (<>
                <div className="name_home_card home_card_bio card_wala_bio  text-slate-300">
                    {formatBioText(user?.bio)?.slice(0,50)}...
                </div>
            </>)}

            <div className="follow_btn_main mt-5">
                {loggedInuser?._id !== user?._id ? (
                <button className="follow_btn" onClick={()=>handleConnection(user?._id)}>
                    {user?.connections?.includes(loggedInuser?._id) ? 'Connected' : "Connect"}
                </button>
                ):(
                  <Link to={`/profile/${user?._id}`}  className="follow_btn">
                    Visit Profile
                  </Link>
                )}
            </div>
        </div>
    </Link>
    </div>
  )
}

export default ConnectionCard


