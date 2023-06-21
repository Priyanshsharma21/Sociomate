import React, { useEffect, useState } from 'react'
import withContainer from '../hof/Hof';
import axios from 'axios';
import { Row, Col } from 'antd'
import { ConnectionCard, UserCard } from '../components';
import { FeedLoader } from '../components/PreLoader';


const Connection = () => {
  const [users, setUsers] = useState([])
  const user = JSON.parse(localStorage.getItem('user')) 
  const token = localStorage.getItem('token');
  const [loader, setLoader] = useState(false)


  useEffect(()=>{

    const fetchAllIUsers = async()=>{
      setLoader(true)
      const { VITE_URL } = import.meta.env;
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };


      try {
        const res = await axios.get(`${VITE_URL}/userz`,options)
        setUsers(res.data.data)
        setLoader(false)
      } catch (error) {
        setLoader(false)
        alert(error.message)
      }
    }

    fetchAllIUsers()
  },[])

  // console.log(users)




  return (
    <div className="connection_page w-full">
      <Row>
        <Col xl={5} lg={5} md={24} sm={24} xs={24}>
          <UserCard />
        </Col>
        <Col xl={18} lg={18} md={24} sm={24} xs={24} className="connection_cards_mains">
          <div className="connection_heading w-full">
            People you may know
          </div>
          <div className="flex flex-wrap justify-between">
            {loader ? (
              <div className="flex justify-center w-full mt-10">
                <FeedLoader />
              </div>
            ):(
              <div className='flex flex-wrap justify-around'>
              {users?.map(user=>(
                <ConnectionCard user={user} id={user?._id}/>
              ))}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default  withContainer(Connection);