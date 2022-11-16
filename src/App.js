import './App.css';
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import HomePage from './pages/home/home';
import NewBlogPage from './pages/new-blog/new-blog';
import BlogPage from './pages/blog/blog';
import AuthPage from './pages/auth/auth';
import PrivateRoute from './components/protected-route';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<AuthPage isNewUser={true} />} />
          <Route path='/login' element={<AuthPage />} />
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/create-new-blog' element={<NewBlogPage />} />
            <Route path='/blogs/:blogName' element={<BlogPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
