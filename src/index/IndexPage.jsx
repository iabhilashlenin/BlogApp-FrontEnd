import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import Footer from '../components/Footer';

function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/post`).then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-600 dark:text-gray-100 text-center">
          Latest Posts
        </h1>
        {posts.length > 0 ? (
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
