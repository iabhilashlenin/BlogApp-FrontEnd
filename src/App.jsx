import { useState } from 'react'
import Post from './components/Post';
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './index/IndexPage';
import LoginPage from './index/LoginPage';
import RegisterPage from './index/RegisterPage';
import { UserContextProvider} from './context/UserContext';
import CreatePost from './index/CreatePost';
import PostPage from './index/PostPage';
import EditPost from './index/EditPost';

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
          <Route path={'/create'} element={<CreatePost/>} />
          <Route path={'/post/:id'} element={<PostPage/>} />
          <Route path={'/edit/:id'} element={<EditPost/>} />
        </Route>
      </Routes>
    </UserContextProvider>

  );
}

export default App;
