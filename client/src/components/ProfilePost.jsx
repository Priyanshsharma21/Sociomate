import React from 'react'
import moment from 'moment'
import {Row,Col} from 'antd'
import { AiOutlinePlayCircle,AiFillLike } from 'react-icons/ai'
import { FcComments } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const ProfilePost = ({post}) => {
  const user = JSON.parse(localStorage.getItem('user')) 

  // console.log(post)
  return (
    <div className="post_card_profile mt-10 cursor-pointer">
        <div className="post_name text-slate-200 font-thin">{post?.user?.name.toUpperCase()} posted this - {moment(post.createdAt).fromNow()}</div>

        

        <div className="post_main_profile_card mt-3">
            <Link to={`/post/detail/${post?._id}`}>
            <Row>
              <Col xl={2} lg={2} md={3} sm={4} xs={4} className="flex justify-center items-center">
              {post?.photo?.secure_url && (<>
                  <div className="w-full h-[100px] flex justify-center items-center rounded-xl relative">
                        <img loading="lazy" src={post?.photo.secure_url} className="w-full h-full object-cover rounded-xl" alt="feed_post" />
                        <AiOutlinePlayCircle className="absolute play_me top-8 left-10 text-[2rem]" />
                  </div>
              </>)}
              </Col>

              <Col xl={22} lg={22} md={21} sm={20} xs={20} className="flex flex-col justify-between">
                  <div className="content_on_profile_post text-slate-200 ml-2">
                    {post?.content.slice(0,300)} ......
                  </div>

                  <div className="post_profile_tags flex">
                    {post?.tags?.map(tag => (
                      <div className="tag_of_post text-blue-500 flex ml-3" key={tag}>
                        #{tag}
                      </div>
                    ))}
                  </div>


                  <div className="likesandcomments flex ml-3">
                    <div className="like_profile_show flex">
                    <div className="like_me">
                      {post?.likes?.length}
                    </div>
                      <AiFillLike className="text-blue-500 ml-1"/>
                    </div>

                    <div className="like_profile_show ml-3 flex">
                    <div className="like_me">
                      {post?.comments?.length}
                    </div>
                       <FcComments className="text-green-500 ml-1"/>
                    </div>
                  </div>
              </Col>
            </Row>
            </Link>
        </div>



        </div>
  )
}

export default ProfilePost