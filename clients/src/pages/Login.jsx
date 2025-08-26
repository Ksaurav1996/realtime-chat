
import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import { googleAuth, loginUser, validUser } from '../apis/auth';
import { Link, useNavigate } from 'react-router-dom';
import { BsEmojiLaughing, BsEmojiExpressionless } from 'react-icons/bs';
import { toast } from 'react-toastify';

const defaultData = {
  email: '',
  password: '',
};

function Login() {
  const [formData, setFormData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const googleSuccess = async (credentialResponse) => {
    if (credentialResponse.credential) {
      setIsLoading(true);
      // Decode Google JWT credential for user details (optional)
      const user = jwtDecode(credentialResponse.credential);
      // Exchange token with your backend
      try {
        const response = await googleAuth({ tokenId: credentialResponse.credential });
        setIsLoading(false);

        if (response.data.token) {
          localStorage.setItem('userToken', response.data.token);
          toast.success('Successfully Logged In!');
          navigate('/chats');
        } else {
          toast.error('Login failed, please try again!');
        }
      } catch (err) {
        setIsLoading(false);
        toast.error('Google Login failed on server!');
      }
    }
  };

  const googleFailure = () => {
    toast.error('Google Sign-In failed. Try again!');
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.includes('@') && formData.password.length > 6) {
      setIsLoading(true);
      const { data } = await loginUser(formData);
      if (data?.token) {
        localStorage.setItem('userToken', data.token);
        toast.success('Successfully Logged In!');
        setIsLoading(false);
        navigate('/chats');
      } else {
        setIsLoading(false);
        toast.error('Invalid Credentials!');
        setFormData({ ...formData, password: '' });
      }
    } else {
      toast.warning('Please provide valid credentials!');
      setFormData(defaultData);
    }
  };
  useEffect(() => {
    // Removed gapi init, not needed for @react-oauth/google

    const isValid = async () => {
      const data = await validUser();
      if (data?.user) {
        window.location.href = '/chats';
      }
    };
    isValid();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/chatbg.png')",
      }}
    >
      <div className="w-full max-w-md bg-[#1d1f23]/90 p-6 rounded-2xl shadow-xl backdrop-blur-md">
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white text-center">Login</h2>
          <p className="text-center text-sm text-gray-400 mt-1">
            No account?{' '}
            <Link to="/register" className="text-teal-400 underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={formData.email}
            onChange={handleOnChange}
            className="w-full bg-[#2b2d33] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-400"
          />

          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleOnChange}
              className="w-full bg-[#2b2d33] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute top-3 right-3 text-white"
            >
              {showPass ? <BsEmojiExpressionless size={24} /> : <BsEmojiLaughing size={24} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 to-yellow-300 text-[#121418] font-bold py-3 rounded-lg relative overflow-hidden"
          >
            {isLoading ? (
              <div className="flex justify-center">
                <lottie-player
                  src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '120px', height: '80px' }}
                  loop
                  autoPlay
                ></lottie-player>
              </div>
            ) : (
              'Login'
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center text-white text-sm">
            <span className="mx-2">or</span>
          </div>

          {/* Google Login (NEW) */}
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            useOneTap
            // You may customize rendering as below if needed
            // However, @react-oauth/google has its own styled button
          />

        </form>
      </div>
    </div>
  );
}

export default Login;
