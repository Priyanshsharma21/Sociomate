import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { AiOutlineLike, AiTwotoneLike} from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { BsShare } from 'react-icons/bs'
import CreatePost from './CreatePost'


const Feed = () => {
    const [posts, setPosts] = useState([])
    const {VITE_URL} = import.meta.env
    const user = JSON.parse(localStorage.getItem('user')) 
    const token = localStorage.getItem('token');


    useEffect(()=>{
        const fetchPost = async()=>{

            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            }

            try {
                const res = await axios.get(`${VITE_URL}/getPosts`,options)
                setPosts(res.data.data)
            } catch (error) {
                alert(error.message)
            }
        }
        fetchPost()
    },[posts.length])

    const truncateContent = (content) => {
        const MAX_LENGTH = 70;
        if (content.length > MAX_LENGTH) {
          return content.slice(0, MAX_LENGTH) + '...';
        }
        return content;
      };
    
      const handleShowMore = (postId) => {
        const updatedPosts = posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              showFullContent: true,
            };
          }
          return post;
        });
        setPosts(updatedPosts);
      };

      const handleShowLess = (postId) => {
        const updatedPosts = posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              showFullContent: false,
            };
          }
          return post;
        });
        setPosts(updatedPosts);
      };


  return (
    <div className="feed ml-5">
        <CreatePost />

        {posts?.map((post,i)=>(
            <div className={`feed_card ${i > 0 ? 'mt-4' : 'mt-4'}`} key={post._id}>
                <div className="feed_user_infp flex">
                    <div className="img_feed_user rounded-full w-[40px] h-[40px]">
                        <img className="rounded-full w-[40px] h-[40px]" src="https://source.unsplash.com/1600x900/?nature,photography,technology" alt="image_url" />
                    </div>

                    <div className="user_info_feed ml-3">
                        <div className="name_of_user text-slate-100">
                            {user?.name.toUpperCase()}
                        </div>

                        <div className="created_user_At text-slate-300">
                            {moment(post.createdAt).fromNow()}
                        </div>
                    </div>
                </div>

                <div className="user_content mt-5">
                    <div className="post_feed_home">
                    <div className="content text-slate-100">
                    {post.showFullContent ? (
                            post.content
                            ) : (
                            <>
                                {post.content.slice(0, 70)}
                                {post.content.length > 70 && '... '}
                                <button
                                className="text-primary-500 mt-2 underline ml-2"
                                onClick={() => handleShowMore(post._id)}
                                >
                                Show more
                                </button>
                            </>
                            )}
                            {post.showFullContent && (
                            <button
                                className="text-primary-500 mt-2 underline ml-2"
                                onClick={() => handleShowLess(post._id)}
                            >
                                Show less
                            </button>
                            )}
                    </div>

                       {post?.photo?.secure_url && (<>
                        <div className="image_main_home_post">
                            <img src={post?.photo.secure_url} className="w-full h-full object-cover image_main_home_post" alt="feed_post" />
                        </div>
                       </>)}
                    </div>
                </div>

                <div className="like_share_comment mt-5 flex w-full justify-around">
                    <div className="like flex cursor-pointer">
                        
                        <AiOutlineLike className='text-white like_share_comment'/>
                        <div className="like_text text-center ml-3">Like</div>
                    </div>

                    <div className="comment flex  cursor-pointer">
                        <BiCommentDetail className='text-white like_share_comment'/>
                        <div className="like_text text-center ml-3">Comment</div>
                    </div>

                    <div className="share flex cursor-pointer">
                        <BsShare className='text-white like_share_comment'/>
                        <div className="like_text text-center ml-3">Share</div>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Feed



// {
//     "photo": {
//         "id": "socioposts/af0ealjgqmbmtqwvise5",
//         "secure_url": "https://res.cloudinary.com/do5ljoll8/image/upload/    v1687111774/socioposts/af0ealjgqmbmtqwvise5.jpg"
//     },
//     "_id": "648f485b2a66e7c38ff5d6f1",
//     "content": "There is an vacancy for frontend developer",
//     "likes": [],
//     "tags": [
//         "frontend",
//         "jobs"
//     ],
//     "comments": [],
//     "createdAt": "2023-06-18T18:09:31.515Z",
//     "updatedAt": "2023-06-18T18:09:31.515Z",
//     "__v": 0
// }