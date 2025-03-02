import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./News.css";
import Nav from "./Nav";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=business&language=en&sortBy=publishedAt&apiKey=52c8562a09804547856d91128eee3af1`
        );
        const data = await response.json();
        if (data.articles) {
          setArticles(data.articles.slice(0, 6)); // Show only top 6 articles
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div>
        <Nav/>
    <div className="news-page">
        
      <h1 className="news-heading">Latest Inventory News</h1>
      <p className="news-subtext">Stay updated with the latest trends and insights</p>
    
      <div className="news-container">
        {loading
          ? // Show skeleton loaders when loading
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="news-card skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-text skeleton-title"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
              </div>
            ))
          : // Show actual news when loaded
            articles.map((article, index) => (
              <div key={index} className="news-card" onClick={() => window.open(article.url, "_blank")}>
                <img src={article.urlToImage || "https://via.placeholder.com/150"} alt="news" className="news-image" />
                <div className="news-content">
                  <h2 className="news-title">{article.title}</h2>
                  <p className="news-description">{article.description?.slice(0, 100) || "No description available"}...</p>
                  <span className="news-source">{article.source.name}</span>
                </div>
              </div>
            ))}
      </div>

      <button className="back-btn" onClick={() => navigate("/features")}>Back to Home</button>
    </div>
    </div>
  );
};

export default News;
