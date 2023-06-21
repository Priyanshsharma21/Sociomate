import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import withContainer from '../hof/Hof';
import { TempLoader } from '../components/PreLoader'
import axios from 'axios'
import moment from 'moment'
import { AiOutlineLike, AiTwotoneLike} from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { BsShare } from 'react-icons/bs'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { BsPencil } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'
import { ConnectionCard, UserCard } from '../components';

const Search = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [loading, setLoading] = useState(false)
    const searchTerm = queryParams.get("q").toLocaleLowerCase()
    const [searchResults, setSearchResult] = useState([])
    const [userResults, setUserResults] = useState([])
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')) 
    const { VITE_URL } = import.meta.env;


    useEffect(()=>{
      const fetchData = async()=>{
        try {
          setLoading(true)
          const options = {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          };
          const res = await axios.get(`${VITE_URL}/findPost?tags=${searchTerm}`,options)
          const userRes = await axios.get(`${VITE_URL}/users?term=${searchTerm}`, options)
          if(res.data.status===true && userRes.data.status===true){
            setLoading(false)
            setSearchResult(res.data.data)
            setUserResults(userRes.data.data)
          }else{
            alert("something went wrong")
          }

        } catch (error) {
          setLoading(false)
          alert(error.message)
        }
      }
      fetchData()
    },[searchTerm])


    console.log(userResults)

  return (
    <div className='searchbox w-full'>
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
            <TempLoader />
        </div>
      ):(
        <div className="search_page">
        <div className="userfound text-white font-semibold">
            User Found on Search Term - {searchTerm}
        </div>
        {userResults?.length === 0 ? (
          <div className="errormessage_no_found flex justify-center mt-4">
            No User Found
          </div>
        ):(
          <div className="users">
              {userResults?.map((user,i)=>(
               <div className="mt-5">
                <ConnectionCard user={user} key={user?._id}/>
               </div>
              ))}
          </div>
        )}
         



          <div className="posts_search text-white font-semibold mt-8">
            Post Found on Search Term - {searchTerm}
          </div>
          <div className="main_posts">
            {searchResults?.length === 0 ? (
              <div className="message_error w-full flex justify-center mt-4">
                No Post Found
              </div>
            ):(
              <div className="posts_main_search">
                  {searchResults?.map((post,i)=>(
                  <div className={`feed_card mt-5 ${i > 0 ? 'mt-4' : 'mt-4'}`} key={post._id}>
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

                                <div className="created_user_At text-slate-300">
                                    {moment(post.createdAt).fromNow()}
                                </div>
                            </div>
                        </div>

                        {post?.user?._id === user._id && (
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
                        <Link to={`/post/detail/${post?._id}`} className="post_feed_home">
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
                                <img loading="lazy" src={post?.photo.secure_url} className="w-full h-full object-cover image_main_home_post" alt="feed_post" />
                            </div>
                          </>)}
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
                                <AiTwotoneLike className="text-white like_share_comment" />
                                ) : (
                                <AiOutlineLike className="text-white like_share_comment" />
                                )}
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
                        </Link>
                    </div>
                </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default withContainer(Search)