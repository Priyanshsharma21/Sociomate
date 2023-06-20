import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsPencil } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios'
import moment from 'moment'
import { AiOutlineLike, AiTwotoneLike, AiOutlineDelete} from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { BsShare } from 'react-icons/bs'
import { Col, Row, Modal } from 'antd'
import {
  FacebookShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,
  HatenaShareCount,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  EmailIcon,
} from "react-share";

const Post = ({post}) => {
  const user = JSON.parse(localStorage.getItem('user')) 
  const token = localStorage.getItem('token');
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState(post.comments);
  const [currentUrl, setCurrentUrl] = useState('');

  const {VITE_URL} = import.meta.env
  const [open, setOpen] = useState(false);

  const handleDeletePost = async(e,id)=>{
    try {
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



  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);



  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    try {
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.post(`${VITE_URL}/addComment/${postId}`, { content: commentInput,userId : user._id }, options);

      if (res.data.status === true) {
        setComments([...comments, res.data.comment]);
        setCommentInput('');
        alert("Comment added successfully")
      } else {
        alert('Something Went Wrong');
      }
    } catch (error) {
      alert(error.message);
    }
  };


  const handleDeleteComment = async (e, commentId) => {
    try {
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.delete(`${VITE_URL}/removeComment/${post._id}/${commentId}/${user._id}`, options);

      if (res.data.status === true) {
        const updatedComments = comments.filter(comment => comment._id !== commentId);
        setComments(updatedComments);
        alert("Comment Deleted")
      } else {
        alert('Something Went Wrong');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLikeClick = async (e, postId) => {
    try {
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.post(`${VITE_URL}/addLike/${postId}/${user._id}`, {}, options);
      // console.log(res)
      if (res.status === 201) {
        alert(res.data.message)
      } else {
        alert('Something Went Wrong');
      }
    } catch (error) {
      alert(error.message);
    }
  };


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

                <div className="like_count_detail mt-3 ml-1 text-slate-300">
                  You and {post?.likes?.length} liked this post
                </div>

                <hr className="mt-3 text-slate-400 break_line"/>
                <div className="like_share_comment mt-5 flex w-full justify-around">
                  <div className="like flex cursor-pointer" onClick={(e) => handleLikeClick(e, post._id)}>
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

                    <div className="share flex cursor-pointer" onClick={() => setOpen(true)}>
                        <BsShare className='text-white like_share_comment'/>
                        <div className="like_text text-center ml-3">Share</div>
                    </div>

                    <Modal
                      title=""
                      centered
                      open={open}
                      onCancel={() => setOpen(false)}
                      width={300}
                      className='todomodel'
                  > 
                 <div className="share_btns flex">
                  <FacebookShareButton
                        url={currentUrl}
                        className="Demo__some-network__share-button"
                      >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>

                    <TwitterShareButton
                    url={currentUrl}
                    className="Demo__some-network__share-button ml-3"
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>

                  <TelegramShareButton
                    url={currentUrl}
                    className="Demo__some-network__share-button ml-3"
                  >
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>

                  <WhatsappShareButton
                       url={currentUrl}
                      className="Demo__some-network__share-button ml-3"
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>

                    <LinkedinShareButton url={currentUrl} className="Demo__some-network__share-button ml-3">
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>

                    <EmailShareButton
                      url={currentUrl}
                      subject="Sociomate Post"
                      body={post?.content}
                      className="Demo__some-network__share-button ml-3"
                    >
                      <EmailIcon size={32} round />
                    </EmailShareButton>
                 </div>

                   
                  </Modal>

                </div>
                

                <div className="comment_this_post">
                <form className="w-full flex" onSubmit={(e) => handleCommentSubmit(e, post._id)}>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInput}
                    required
                    autoFocus
                    className="comment_inp"
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                  <button className="submit_comment" type="submit">Submit</button>
                </form>

                {comments?.map((comment) => (
                  <div className="comment_structure" key={comment?._id}>
                    <Row>
                      <Col span={2}>
                      <Link  to={`/profile/${comment?.user}`} className="img_feed_user rounded-full w-[40px] h-[40px]">
                            <LazyLoadImage
                                effect="blur" 
                                src="https://source.unsplash.com/1600x900/?nature,photography,technology"
                                alt="image_url"
                                className="rounded-full w-[40px] h-[40px]"
                          />
                        </Link>
                      </Col>
                      <Col span={22}>
                        <div className="flex justify-between items-center ml-2">
                          <p>{comment?.content}</p>
                          {/* {comment?.user === user._id &&(
                            <button onClick={(e) => handleDeleteComment(e, comment._id)}>
                              <AiOutlineDelete className="text-white"/>
                            </button>
                          )} */}
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
    </div>
  )
}

export default Post