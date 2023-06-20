import { useEffect, useState } from "react";
import { PreLoader } from "./components/PreLoader.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Auth, Connection, Home, Profile, Search,EditPost, PostDetails } from "./pages";
import UserProfile from "./pages/UserProfile.jsx";



const App = () => {
  const [preLoader, setPreLoader] = useState(true);
  const [timer, setTimer] = useState(2);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      setPreLoader(false);
      if (token) {
        navigate('/'); // Redirect to home if token is present
      } else {
        navigate('/auth'); // Redirect to auth page if token is not present
      }
    }
  }, [timer, token]);

  return (
    <div className="main_ref">
      {preLoader ? (
        <div className="preloader w-full h-screen flex flex-col justify-center items-center">
          <PreLoader />
        </div>
      ) : (
        <div className="main_wrapper relative z-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/profile/:uid" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/post/edit/:postId" element={<EditPost />} />
            <Route path="/post/detail/:postId" element={<PostDetails />} />

          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
