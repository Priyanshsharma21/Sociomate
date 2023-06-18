import React from 'react';
import { Navbar } from '../components'



const withContainer = (WrappedComponent) => {
  return (props) => (
    <div className="container_wrapper w-full">
        <Navbar />
        <WrappedComponent {...props} />
    </div>
  );
};

export default withContainer
