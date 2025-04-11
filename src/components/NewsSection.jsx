import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

const NewsSection = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fd215b80f78a4a2983198435bb44670e"
        );
        console.log("API Response:", res.data);

        setArticles(res.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="px-4 py-4">
        <div className="flex flex-wrap -m-4">
          {articles
            .filter((article) => article.urlToImage) // only include articles with an image
            .map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
