import React, { useEffect, useState } from 'react'
import withContainer from '../hof/Hof';
import axios from 'axios';
import { Row, Col } from 'antd'
import { ConnectionCard, UserCard } from '../components';



const Connection = () => {
  const [users, setUsers] = useState([])
  const user = JSON.parse(localStorage.getItem('user')) 
  const token = localStorage.getItem('token');


  useEffect(()=>{

    const fetchAllIUsers = async()=>{

      const { VITE_URL } = import.meta.env;
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };


      try {
        const res = await axios.get(`${VITE_URL}/userz`,options)
        setUsers(res.data.data)
      } catch (error) {
        alert(error.message)
      }
    }

    fetchAllIUsers()
  },[])

  // console.log(users)




  return (
    <div className="connection_page w-full">
      <Row>
        <Col xl={6} lg={6} md={24} sm={24} xs={24}>
          <UserCard />
        </Col>
        <Col xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className="connection_heading w-full">
            Connect With People
          </div>
          <div className="flex flex-wrap justify-between">
            {users?.map(user=>(
              <ConnectionCard user={user} id={user?._id}/>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default  withContainer(Connection);