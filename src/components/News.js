import React, { useState, useEffect } from 'react'
import Weather from './weather'

const newsApi = {
  key: "36e0018d616145ebb8938f16bdb86933",
  base: 'https://newsapi.org/v2/everything?q=${city}&apiKey=${NEWS_API_KEY}',
}

function News({ news }) {

  const [search, setSearch] = useState("");


  return (
    <>
      <div>
      
        {news.map((item) => (
          <div>
              <img className='news-img' src={item.urlToImage} alt={item.url}/>
          <h3><a href={item.url}>{item.title}</a></h3>
         
          

            <p>{item.title }</p>
            <p>{ item.description }</p>
            <p>{ item.url }</p>
            <p> { item.urlToImage } </p>
            </div>
        ))}
      </div>
    </>
  )
}

export default News
