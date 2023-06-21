import React from 'react'
import {prelogo} from '../assets'


export const PreLoader = () => {
  return (
    <>
    <div className="prelogo">
        <img loading="lazy" src={prelogo} alt="pre_logo" className="object-cover" />
    </div>
    <div className="loader mt-1"></div>
    </>
  )
}


export const LoginLoader = ()=>{
  return(
    <>
      <div className="loader_login">
        <div className="dot_login dot-1"></div>
        <div className="dot_login dot-2"></div>
        <div className="dot_login dot-3"></div>
        <div className="dot_login dot-4"></div>
        <div className="dot_login dot-5"></div>
      </div>

    </>
  )
}



export const TempLoader = ()=>{
  return (
    <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
    </div>
  )
}


export const FeedLoader = ()=>{
  return (
    <div class="loader_second">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="bar4"></div>
        <div class="bar5"></div>
        <div class="bar6"></div>
        <div class="bar7"></div>
        <div class="bar8"></div>
        <div class="bar9"></div>
        <div class="bar10"></div>
        <div class="bar11"></div>
        <div class="bar12"></div>
    </div>
  )
}



