import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import Footer from '../components/Footer';
import { RingLoader } from 'react-spinners'; // You can use any spinner you like

function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/post`);
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched or if there's an error
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-600 dark:text-gray-100 text-center">
          Latest Posts
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">Loading
            <RingLoader color="#3498db" loading={loading} size={60} /> {/* Add your loading spinner here */}
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
