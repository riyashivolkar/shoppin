import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import dummyNews from "../utils/dummyNews.json"; // Import the dummy JSON data

const NewsSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle any potential errors

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Use the imported dummy JSON data
        const data = dummyNews;

        // Simulate a network delay with setTimeout
        setTimeout(() => {
          setArticles(data.articles);
          setLoading(false);
        }, 1000); // 1 second delay to simulate fetching time
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(error.message); // Set error message if something goes wrong
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="px-4 py-4">
        {loading ? ( // Show a loading message while data is being fetched
          <p>Loading news...</p>
        ) : error ? ( // Show error message if there was an issue fetching the news
          <p>Error: {error}</p>
        ) : (
          <div className="flex flex-wrap -m-4">
            {articles.length > 0 ? (
              articles
                .filter((article) => article.urlToImage) // only include articles with an image
                .map((article, index) => (
                  <NewsCard key={index} article={article} />
                ))
            ) : (
              <p>No articles found</p> // In case articles array is empty
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
