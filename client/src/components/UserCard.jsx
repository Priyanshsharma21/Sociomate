import React from 'react'
import { Link } from 'react-router-dom'


const UserCard = () => {

const user = JSON.parse(localStorage.getItem('user')) 

    // console.log(user)
  return (
    <Link to={`/userprofile`} className="flex flex-col w-full card_user relative">
        <div className="banner_home_card">
            <img className="object-cover w-full h-full" src="https://source.unsplash.com/1600x900/?nature,photography,technology" alt="home_card" />
        </div>

        <div className="img_profile rounded-full absolute">
            <img className="object-cover w-full h-full rounded-full" src="https://source.unsplash.com/1600x900/?nature" alt="home_card" />
        </div>

        <div className="user_info mt-5">
            <div className="name_home_card mt-2">{user.name.toUpperCase()}</div>
            <div className="name_home_card mt-2">{user.email}</div>
        </div>
    </Link>
  )
}

export default UserCard