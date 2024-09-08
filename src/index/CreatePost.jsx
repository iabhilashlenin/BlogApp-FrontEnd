import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../components/Editor';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null); // For error handling

  async function createNewPost(ev) {
    ev.preventDefault();
    
    // Check if file is selected
    if (!files || !files[0]) {
      setError("Please select a file before submitting.");
      return;
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]); // Ensure file exists

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/post`, {
        method: "POST",
        body: data,
        credentials: 'include'
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        setError("Failed to create post. Please try again.");
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form
      onSubmit={createNewPost}
      className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg w-[600px] mx-auto"
    >
      {error && <p className="text-red-500">{error}</p>} {/* Display errors */}
      
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      />

      <input
        type="file"
        onChange={ev => setFiles(ev.target.files)}
        className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600"
      />

      <Editor value={content} onChange={setContent}/>

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        Create Post
      </button>
    </form>
  );
}

export default CreatePost;
