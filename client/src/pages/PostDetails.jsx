import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TempLoader } from '../components/PreLoader'
import withContainer from '../hof/Hof'
import { Row, Col } from 'antd'
import { NewsCard, Post, UserCard } from '../components'



const PostDetails = () => {
    const { postId } = useParams()
    const [post, setPost] = useState([])
    const [loader, setLoader] = useState(false)
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'))
    const {VITE_URL} = import.meta.env

    useEffect(()=>{
        const fetchPostDetails = async()=>{
            try {
                setLoader(true)
                const options = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                      }
                }

                const res = await axios.get(`${VITE_URL}/post/${postId}`,options)

                if(res.data.status===true){
                    setLoader(false)
                    setPost(res.data.data);
                }else{
                    alert("Something Went Wrong")
                }
            } catch (error) {
                setLoader(false)
                alert(error.message)
            }
        }

        fetchPostDetails()
    },[])

    // console.log(post)


  return (
    <div className='w-full'>
        {loader ? (
            <div className="show_loader w-full flex justify-center items-center h-screen">
                <TempLoader />
            </div>
        ):(
            <div className="profileDetails w-full">
            <div className="home w-full">
                    <Row>
                        <Col xl={6} lg={6} md={24} sm={24} xs={24}>
                            <UserCard />
                        </Col>
                        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                            <Post post={post} id={post?._id}/>
                        </Col>
                        <Col xl={6} lg={6} md={24} sm={24} xs={24}>
                            <NewsCard />
                        </Col>
                    </Row>
                </div>
            </div>
        )}
    
    </div>
  )
}

export default withContainer(PostDetails)