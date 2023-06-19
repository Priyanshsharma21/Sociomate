import React from 'react'
import { mokeNews } from '../constant/index.js'

const NewsCard = () => {
  return (
    <div className="news_card ml-5">
        {mokeNews?.map((news,i)=>(
            <div target="_blank" rel="noopener" className="newsCard mt-5">
            
                <a href={news.link} target="_blank" rel="noopener">
                    <div className="newsName text-white">
                        {news.title}
                    </div>
                    <div className="time_ago flex mt-2">
                        <div className="time text-slate-300 ">{news.time}</div>
                        <div className="likes_news text-slate-300 ml-3">{news.likes} reads</div>
                    </div>
                </a>
            </div>
        ))}
    </div>
  )
}

export default NewsCard