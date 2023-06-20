import React from 'react'
import moment from 'moment'
import {Row,Col} from 'antd'
import { AiOutlinePlayCircle } from 'react-icons/ai'

const ProfilePost = ({post}) => {
  const user = JSON.parse(localStorage.getItem('user')) 

  // console.log(post)
  return (
    <div className="post_card_profile mt-10 cursor-pointer">
        <div className="post_name text-slate-200 font-thin">{post?.user?.name.toUpperCase()} posted this - {moment(post.createdAt).fromNow()}</div>



        <div className="post_main_profile_card mt-3">
            <Row>
              <Col span={2}>
              {post?.photo?.secure_url && (<>
                  <div className="w-full h-[100px] rounded-xl relative">
                        <img loading="lazy" src={post?.photo.secure_url} className="w-full h-full object-cover rounded-xl" alt="feed_post" />
                        <AiOutlinePlayCircle className="absolute top-8 left-10 text-[2rem]" />
                  </div>
              </>)}
              </Col>

              <Col span={22}>
                  <div className="content_on_profile_post text-slate-200 ml-2">
                    {post?.content.slice(0,300)} ......
                  </div>
              </Col>
            </Row>
        </div>



        </div>
  )
}

export default ProfilePost