import React from 'react'
import { Link } from 'react-router-dom'


const UserCard = () => {

const user = JSON.parse(localStorage.getItem('user')) 


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
    <Link to={`/profile/${user?._id}`} className="flex flex-col w-full card_user relative">
        <div className="banner_home_card">
            <img loading="lazy" className="object-cover w-full h-full" src="https://source.unsplash.com/1600x900/?nature,photography,technology" alt="home_card" />

            <div className="img_profile rounded-full top-[7rem] left-[40%] absolute">
              <img loading="lazy" className="object-cover w-full h-full rounded-full" src="https://source.unsplash.com/1600x900/?nature" alt="home_card" />
            </div>
        </div>

       

        <div className="user_info mt-5">
            <div className="name_home_card ">{user.name.toUpperCase()}</div>

            {user.bio ? (<>
                <div className="name_home_card home_card_bio  text-slate-300">
                    {formatBioText(user.bio)}
                </div>
            </>):(
              <div className="button_create_bio">
                <Link className="font-semibold" to={`/profile/${user?._id}`}>
                  Add Bio
                </Link>
              </div>
            )}
        </div>
    </Link>
  )
}

export default UserCard