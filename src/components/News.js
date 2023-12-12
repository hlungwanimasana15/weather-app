import React, { useState, } from 'react';


const newsApi = {
  key: "36e0018d616145ebb8938f16bdb86933",
  base: 'https://newsapi.org/v2/everything?q=${city}&apiKey=${NEWS_API_KEY}',
};

function News({ news }) {
  const [search, setSearch] = useState("");

  return (
    <div className="news-container">
      {news.map((item, index) => (
        <div key={index} className="news-item">
          <img className='news-img' src={item.urlToImage} alt={item.url} />
          <div className="news-details">
            <h3><a href={item.url}>{item.title}</a></h3>
            <p className="description">{item.description}</p>
            <p className="source">Source: {item.source.name}</p>
            <p className="published-at">Published at: {new Date(item.publishedAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default News;
