import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { AiOutlineLike, AiTwotoneLike} from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { BsShare } from 'react-icons/bs'
import CreatePost from './CreatePost'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom'
import { BsPencil } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'
import { FeedLoader } from '../components/PreLoader.jsx'


const Feed = () => {
    const [posts, setPosts] = useState([])
    const {VITE_URL} = import.meta.env
    const user = JSON.parse(localStorage.getItem('user')) 
    const token = localStorage.getItem('token');
    const [loader, setLoader] = useState(false)

    useEffect(()=>{
        const fetchPost = async()=>{
            setLoader(true)
            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            }

            try {
                const res = await axios.get(`${VITE_URL}/getPosts`,options)
                setPosts(res.data.data)
                setLoader(false)

            } catch (error) {
                setLoader(false)
                alert(error.message)
            }
        }
        fetchPost()
    },[posts.length])

    

  return (
    <div className="feed ml-5">
        <CreatePost />

        {loader ? (
            <div className="loader_fee_one flex justify-center w-full mt-10">
                <FeedLoader />
            </div>
        ):(
            <>
            {posts?.map((post,i)=>(
            <div className={`feed_card ${i > 0 ? 'mt-4' : 'mt-4'}`} key={post._id}>
                <div  className="feed_user_infp flex justify-between w-full items-center">
                    <Link to={`/profile/${post?.user?._id}`} className="post_wrap flex">
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

                            <div className="created_user_At text-slate-300">
                                {moment(post.createdAt).fromNow()}
                            </div>
                        </div>
                    </Link>

                    {post?.user?._id === user._id && (
                        <div className="flex">
                            <Link to={`/post/edit/${post?._id}`} className="edit_post_wrapper mr-5">
                                <BsPencil className='edit_post'/>
                            </Link>
                        </div>
                    )}
                </div>
                
                <div className="user_content mt-5">
                    <Link to={`/post/detail/${post?._id}`}>
                    <div className="post_feed_home">
                    <div className="content text-slate-100">
                    {post.showFullContent ? (
                            post.content
                            ) : (
                            <>
                                {post.content.slice(0, 70)}
                                {post.content.length > 70 && '... '}
                                <button
                                className="text-primary-400 mt-2 show_more_post ml-1 text-slate-300"
                                >
                                Show more
                                </button>
                            </>
                            )}
                            {post.showFullContent && (
                            <button
                                className="text-primary-500 mt-2 underline ml-2"
                            >
                                Show less
                            </button>
                            )}
                    </div>

                       {post?.photo?.secure_url && (<>
                        <div className="image_main_home_post">
                            <img loading="lazy" src={post?.photo.secure_url} className="w-full h-full object-cover image_main_home_post" alt="feed_post" />
                        </div>
                       </>)}
                    </div>
                    </Link>
                </div>
                {/*  */}
                <div className="like_count_detail mt-3 ml-1 text-slate-300">
                  You and {post?.likes?.length} liked this post
                </div>

                <hr className="mt-3 text-slate-400 break_line"/>
                <div className="like_share_comment mt-5 flex w-full justify-around">
                    <Link to={`/post/detail/${post?._id}`} className="flex w-full justify-around">
                        <div className="like flex cursor-pointer">
                            {post?.likes?.some((like) => like.user === user._id) ? (
                            <AiTwotoneLike className="text-white make_ing_res like_share_comment" />
                            ) : (
                            <AiOutlineLike className="text-white make_ing_res like_share_comment" />
                            )}
                            <div className="like_text make_ing_res text-center make_res_ing ml-3">Like</div>
                        </div>

                        <div className="comment flex  cursor-pointer">
                            <BiCommentDetail className='text-white like_share_comment make_ing_res'/>
                            <div className="like_text make_ing_res text-center make_res_ing ml-3">Comment</div>
                        </div>

                        <div className="share flex cursor-pointer">
                            <BsShare className='text-white like_share_comment make_ing_res'/>
                            <div className="like_text make_ing_res text-center make_res_ing ml-3">Share</div>
                        </div>
                    </Link>
                </div>
            </div>
        ))}
            </>
        )}
    </div>
  )
}

export default Feed


