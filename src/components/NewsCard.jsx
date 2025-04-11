const NewsCard = ({ article }) => {
  const getTimeAgo = (publishedAt) => {
    const publishedDate = new Date(publishedAt);
    const now = new Date();
    const diffInSeconds = Math.floor((now - publishedDate) / 1000);

    const days = Math.floor(diffInSeconds / (3600 * 24));
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <div className="py-2 md:w-1/3">
      <div className="h-full overflow-hidden border-2 border-gray-200 rounded-2xl border-opacity-60">
        <img
          className="object-cover object-center w-full lg:h-48 md:h-36"
          src={article.urlToImage || "https://dummyimage.com/720x400"}
          alt="news"
        />
        <div className="p-6">
          {/* <h2 className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">
            {article.source.name}
          </h2> */}
          <h1 className="mb-3 text-lg font-medium text-gray-900 title-font">
            {article.title}
          </h1>
          <p className="mb-3 leading-relaxed">{article.description}</p>
          <div className="flex flex-wrap items-center space-x-1 text-sm text-gray-500">
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center"
            >
              {article.source?.name || "Unknown"}
            </a>
            <span>·</span>
            <span>{getTimeAgo(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
