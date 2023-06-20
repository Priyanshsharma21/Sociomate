import React from 'react'
import {prelogo} from '../assets'


export const PreLoader = () => {
  return (
    <>
    <div className="prelogo">
        <img loading="lazy" src={prelogo} alt="pre_logo" className="object-cover" />
    </div>
    <div class="loader mt-1"></div>
    </>
  )
}


export const LoginLoader = ()=>{
  return(
    <>
      <div class="loader_login">
        <div class="dot_login dot-1"></div>
        <div class="dot_login dot-2"></div>
        <div class="dot_login dot-3"></div>
        <div class="dot_login dot-4"></div>
        <div class="dot_login dot-5"></div>
      </div>

    </>
  )
}



export const TempLoader = ()=>{
  return (
    <div class="wrapper">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
    </div>
  )
}