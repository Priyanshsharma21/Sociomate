import React from 'react'
import { useLocation } from "react-router-dom";


const Search = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("q")



  return (
    <div>{searchTerm}</div>
  )
}

export default Search