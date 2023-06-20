import React from 'react'
import { Link } from 'react-router-dom'
import { BsPencil } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios'
import moment from 'moment'
import { AiOutlineLike, AiTwotoneLike} from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { BsShare } from 'react-icons/bs'




const Post = ({post}) => {
  const user = JSON.parse(localStorage.getItem('user')) 
  const token = localStorage.getItem('token');


  const handleDeletePost = async(e,id)=>{
    try {
        console.log(id)
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
        const res = await axios.delete(`${VITE_URL}/removePost/${id}`,options)
        
        if(res.data.status === true){
            alert("Post Deleted Successfully")
            window.location.reload();
        }else{
            alert("Something Went Wrong")
        }
    } catch (error) {
        alert(error.message)
    }
  }


  return (
    <div className="w-full post_detail_card">
      <Link to={`/profile/${post?.user?._id}`} className="feed_user_infp flex justify-between w-full items-center">
                    <div className="post_wrap flex">
                        <div className="img_feed_user rounded-full w-[40px] h-[40px]">
                            <LazyLoadImage
                                effect="blur" 
                                src="https://source.unsplash.com/1600x900/?nature,photography,technology"
                                alt="image_url"
                                className="rounded-full w-[40px] h-[40px]"
                            />
                        </div>

                        <div className="user_info_feed ml-3">
                            <div className="name_of_user text-slate-100">
                                {post?.user?.name.toUpperCase()}
                            </div>

                            <div className="bio_of_user mt-2 text-slate-100">
                                {post?.user?.bio?.toUpperCase()?.slice(0,60)}...
                            </div>

                            <div className="created_user_At text-slate-300">
                                {moment(post?.createdAt).fromNow()}
                            </div>
                        </div>
                    </div>

                    {post?.user?._id === user?._id && (
                        <div className="flex">
                            <Link to={`/post/edit/${post?._id}`} className="edit_post_wrapper mr-5">
                                <BsPencil className='edit_post'/>
                            </Link>

                            <div className="delete_me" onClick={(e) => handleDeletePost(e,post?._id)}>
                                <MdDeleteOutline className='edit_post delete_post' />
                            </div>
                        </div>
                    )}
                </Link>


                <div className="user_content mt-5">
                    <div className="post_feed_home">
                    <div className="content text-slate-100">
                      {post?.content}
                    </div>

                       {post?.photo?.secure_url && (<>
                        <div className="image_main_home_post">
                            <img loading="lazy" src={post?.photo?.secure_url} className="w-full h-full object-cover image_main_home_post" alt="feed_post" />
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
  )
}

export default Post