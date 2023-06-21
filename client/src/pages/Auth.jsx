import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginLoader } from '../components/PreLoader.jsx'


const Auth = () => {
  const {VITE_URL} = import.meta.env
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)


  const [loginForm, setLoginForm] = useState({
    loginMobile: '',
    loginPassword: '',
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post(`${VITE_URL}/login`, {
        mobile : loginForm.loginMobile,
        password : loginForm.loginPassword
      })

      if(res.data.status === true){
        localStorage.setItem('token', res.data.data)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        setLoading(false)
        navigate('/')
      }else{
        setLoading(false)
        alert("Enter all the details")
      }
    } catch (error) {
         setLoading(false)

        alert(error.message)
        console.error(error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true)
        const res = await axios.post(`${VITE_URL}/signup`,registerForm)
        if(res.data.status === true){
          setLoading(false)
          alert("SignUp Successfully, Now Log In")
        }else{
          setLoading(false)
          alert("Something Went Wrong")
        }
    } catch (error) {
        setLoading(false)
        alert(error.message)
      console.error(error);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen auth_main">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="login">
          <form className="form" onSubmit={handleLoginSubmit}>
            <label htmlFor="chk" aria-hidden="true">
              Log in
            </label>
            <input
              className="input"
              type="number"
              name="loginMobile"
              placeholder="Contact Number"
              value={loginForm.loginMobile}
              onChange={handleLoginChange}
              required
            />
            <input
              className="input"
              type="password"
              name="loginPassword"
              placeholder="Password"
              value={loginForm.loginPassword}
              onChange={handleLoginChange}
              required
            />
            <button type="submit">
              {loading ? (
                <div className="log_load flex justify-center items-center">
                  <LoginLoader />
                </div>
              ):(
                <>
                  Log In
                </>
              )}
            </button>
          </form>
        </div>

        <div className="register">
          <form className="form" onSubmit={handleRegisterSubmit}>
            <label htmlFor="chk" aria-hidden="true">
              Register
            </label>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Username"
              value={registerForm.name}
              onChange={handleRegisterChange}
              required
            />
            <input
              className="input"
              type="number"
              name="mobile"
              placeholder="Contact Number"
              value={registerForm.mobile}
              onChange={handleRegisterChange}
              required
            />
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              required
            />
             <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              required
            />
            <button type="submit">
              {loading ? (
                <div className="log_load flex justify-center items-center">
                  <LoginLoader />
                </div>
              ):(
                <>
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
