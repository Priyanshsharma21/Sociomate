import React from 'react'
import {prelogo} from '../assets'


const PreLoader = () => {
  return (
    <>
    <div className="prelogo">
        <img src={prelogo} alt="pre_logo" className="object-cover" />
    </div>
    <div class="loader mt-5"></div>
    </>
  )
}

export default PreLoader