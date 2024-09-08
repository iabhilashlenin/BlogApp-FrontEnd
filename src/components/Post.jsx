import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

function Post({ _id, title, summary, cover, createdAt, author }) {
  return (
    <div className="space-y-16 m-8">
      <div className="flex flex-col lg:flex-row justify-between items-start space-y-6 lg:space-y-0 lg:space-x-10">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <Link to={`/post/${_id}`}>
            <img
              className="w-full h-64 object-cover rounded-lg shadow-md"
              src={`${import.meta.env.VITE_API_URL}/${cover}`}
              alt={title}
            />
          </Link>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2">
          <Link to={`/post/${_id}`}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 hover:text-blue-600">
              {title}
            </h2>
          </Link>

          <p className="text-sm text-gray-500 mb-2 flex items-center space-x-2">
            <span>{author.username}</span>
            <span>•</span>
            <time className="text-gray-400">
              <TimeAgo date={createdAt} />
            </time>
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Post;
