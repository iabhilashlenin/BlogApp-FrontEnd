import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import Footer from '../components/Footer';

function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/post`)
      .then(response => response.json())
      .then(posts => {
        setPosts(posts);
        setLoading(false); // Data fetched, stop loading
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-600 dark:text-gray-100 text-center">
          Latest Posts
        </h1>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map(post => (
              <Post key={post._id} {...post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No posts available
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default IndexPage;
