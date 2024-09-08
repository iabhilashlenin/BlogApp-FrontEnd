import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { UserContext } from '../context/UserContext';

function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate(); // To redirect after deleting

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/post/${id}`).then(response => {
      response.json().then(postInfo => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);

  if (!postInfo) {
    return <div className="text-center py-16 text-gray-700 dark:text-gray-300">Loading...</div>; // Display loading state
  }

  // Function to delete the post
  const deletePost = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      await fetch(`${import.meta.env.VITE_API_URL}/delete/${postInfo._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      navigate('/'); // Redirect to homepage after deletion
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-20 py-20  dark:bg-gray-900">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        {postInfo.title}
      </h1>

      {/* Author & Time */}
      <div className="flex justify-center items-center space-x-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
        <div className="font-semibold">Published by- {postInfo.author.username}</div>
        <span>•</span>
        <time>
          <TimeAgo date={postInfo.createdAt} />
        </time>
      </div>

      {/* Edit/Delete Options for Author */}
      {userInfo?.id === postInfo.author._id && (
        <div className="text-center mb-6 space-x-4">
          <Link
            to={`/edit/${postInfo._id}`}
            className="inline-block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold"
          >
            Edit this post
          </Link>
          <button
            onClick={deletePost}
            className="inline-block text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-semibold"
          >
            Delete this post
          </button>
        </div>
      )}

      {/* Blog Cover Image */}
      <div className="mb-8">
        <img
          className="w-full h-96 object-cover rounded-lg shadow-lg"
          src={`${import.meta.env.VITE_API_URL}/${postInfo.cover}`}
          alt={postInfo.title}
        />
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed mb-16">
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
      </div>
    </div>
  );
}

export default PostPage;
