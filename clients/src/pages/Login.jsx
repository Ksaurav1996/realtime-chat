// import React from 'react'
// import { useEffect } from 'react'
// import { GoogleLogin } from "react-google-login"
// import { gapi } from "gapi-script"
// import { googleAuth } from '../apis/auth'
// import { useState } from 'react'
// import { loginUser } from '../apis/auth'
// import { Link, useNavigate } from 'react-router-dom'
// import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs"
// import { toast } from 'react-toastify';
// import { validUser } from '../apis/auth'
// const defaultData = {
//   email: "",
//   password: ""
// }
// function Login() {
//   const [formData, setFormData] = useState(defaultData)
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPass, setShowPass] = useState(false)
//   const pageRoute = useNavigate()
//   const googleSuccess = async (res) => {
//     if (res?.profileObj) {
//       console.log(res.profileObj)
//       setIsLoading(true)
//       const response = await googleAuth({ tokenId: res.tokenId })
//       setIsLoading(false)

//       console.log("response :" + res)
//       if (response.data.token) {
//         localStorage.setItem("userToken", response.data.token)
//         pageRoute("/chats")

//       }
//     }
//   }
//   const googleFailure = (error) => {
//     // toast.error("Something went Wrong.Try Again!")
//   }
//   const handleOnChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const formSubmit = async (e) => {
//     e.preventDefault()
//     if (formData.email.includes("@") && formData.password.length > 6) {
//       setIsLoading(true)
//       const { data } = await loginUser(formData)
//       if (data?.token) {
//         localStorage.setItem("userToken", data.token)
//         toast.success("Succesfully Login!")
//         setIsLoading(false)
//         pageRoute("/chats")
//       }
//       else {
//         setIsLoading(false)
//         toast.error("Invalid Credentials!")
//         setFormData({ ...formData, password: "" })
//       }
//     }
//     else {
//       setIsLoading(false)
//       toast.warning("Provide valid Credentials!")
//       setFormData(defaultData)

//     }
//   }
//   useEffect(() => {
//     const initClient = () => {
//       gapi.client.init({
//         clientId: process.env.REACT_APP_CLIENT_ID,
//         scope: ''
//       });
//     };
//     gapi.load('client:auth2', initClient);
//     const isValid = async () => {
//       const data = await validUser()
//       if (data?.user) {
//         window.location.href = "/chats"
//       }

//     }
//     isValid()
//   }, [])
//   return (
//     <>

//       <div className='bg-[#121418] w-[100vw] h-[100vh] flex justify-center items-center'>
//         <div className='w-[90%] sm:w-[400px] pl-0 ml-0 h-[400px] sm:pl-0 sm:ml-9 mt-20 relative'>
//           {/* <img className='w-[100px] absolute -top-16 left-28' src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/78c4af118001599.608076cf95739.jpg" alt="" /> */}
//           <div className='absolute -top-5 left-0'>
//             <h3 className=' text-[25px] font-bold tracking-wider text-[#fff]'>Login</h3>
//             <p className='text-[#fff] text-[12px] tracking-wider font-medium'>No Account ? <Link className='text-[rgba(0,195,154,1)] underline' to="/register">Sign up</Link></p>
//           </div>
//           {/* <h2 className='text-2xl text-[#fff] font-bold tracking-wide my-6 text-center'>Login to your Account</h2> */}
//           <form className='flex flex-col gap-y-3 mt-[12%]' onSubmit={formSubmit}>
//             <div>
//               <input className="w-[100%] sm:w-[80%] bg-[#222222] h-[50px] pl-3 text-[#ffff]" onChange={handleOnChange} name="email" type="text" placeholder='Email' value={formData.email} required />

//             </div>
//             <div className='relative'>

//               <input className='w-[100%] sm:w-[80%] bg-[#222222] h-[50px] pl-3 text-[#ffff]' onChange={handleOnChange} type={showPass ? "text" : "password"} name="password" placeholder='Password' value={formData.password} required />
//               {
//                 !showPass ? <button type='button'><BsEmojiLaughing onClick={() => setShowPass(!showPass)} className='text-[#fff] absolute top-3 right-5 sm:right-24 w-[30px] h-[25px]' /></button> : <button type='button'> <BsEmojiExpressionless onClick={() => setShowPass(!showPass)} className='text-[#fff] absolute top-3 right-5 sm:right-24 w-[30px] h-[25px]' /></button>
//               }
//             </div>

//             <button style={{ background: "linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)" }} className='w-[100%]  sm:w-[80%] h-[50px] font-bold text-[#121418] tracking-wide text-[17px] relative' type='submit'>
//               <div style={{ display: isLoading ? "" : "none" }} className='absolute -top-[53px] left-[27%] sm:-top-[53px] sm:left-[56px]'>

//                 <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json" background="transparent" speed="1" style={{ width: "200px", height: "160px" }} loop autoplay></lottie-player>
//               </div>
//               <p style={{ display: isLoading ? "none" : "block" }} className='test-[#fff]'>Login</p>
//             </button>
//             {/* <div className='border-t-[1px] w-[100%] sm:w-[80%] my-3' ></div> */}
//             <p className='text-[#fff] text-center sm:-ml-20'>/</p>
//             <GoogleLogin
//               clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
//               render={(renderProps) => (
//                 <button style={{ borderImage: "linear-gradient(to right, rgba(0,195,154,1) 50%, rgba(224,205,115,1) 80%)", borderImageSlice: "1" }} onClick={renderProps.onClick} disabled={renderProps.disabled} aria-label="Continue with google" className="focus:ring-2 focus:ring-offset-1  py-3.5 px-4 border rounded-lg  flex items-center w-[100%]  sm:w-[80%]" disableElevation={true} disablefocusRipple={true}>
//                   <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg" alt="google" />
//                   <p className="text-[base] font-medium ml-4 text-[#fff]">Continue with Google</p>
//                 </button>
//               )}
//               onSuccess={googleSuccess}
//               onFailure={googleFailure}
//               cookiePolicy={'single_host_origin'}
//               scope="profile email https://www.googleapis.com/auth/user.birthday.read"
//             />


//           </form>
//         </div>

//       </div>
//     </>
//   )
// }

// export default Login
// import React, { useEffect, useState } from 'react';
// import { GoogleLogin } from 'react-google-login';
// import { gapi } from 'gapi-script';
// import { googleAuth, loginUser, validUser } from '../apis/auth';
// import { Link, useNavigate } from 'react-router-dom';
// import { BsEmojiLaughing, BsEmojiExpressionless } from 'react-icons/bs';
// import { toast } from 'react-toastify';

// const defaultData = {
//   email: '',
//   password: '',
// };

// function Login() {
//   const [formData, setFormData] = useState(defaultData);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPass, setShowPass] = useState(false);
//   const navigate = useNavigate();

//   const googleSuccess = async (res) => {
//     if (res?.profileObj) {
//       setIsLoading(true);
//       const response = await googleAuth({ tokenId: res.tokenId });
//       setIsLoading(false);

//       if (response.data.token) {
//         localStorage.setItem('userToken', response.data.token);
//         navigate('/chats');
//       }
//     }
//   };

//   const googleFailure = () => {
//     toast.error('Google Sign-In failed. Try again!');
//   };

//   const handleOnChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const formSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.email.includes('@') && formData.password.length > 6) {
//       setIsLoading(true);
//       const { data } = await loginUser(formData);
//       if (data?.token) {
//         localStorage.setItem('userToken', data.token);
//         toast.success('Successfully Logged In!');
//         setIsLoading(false);
//         navigate('/chats');
//       } else {
//         setIsLoading(false);
//         toast.error('Invalid Credentials!');
//         setFormData({ ...formData, password: '' });
//       }
//     } else {
//       toast.warning('Please provide valid credentials!');
//       setFormData(defaultData);
//     }
//   };

//   useEffect(() => {
//     const initClient = () => {
//       gapi.client.init({
//         clientId: process.env.REACT_APP_CLIENT_ID,
//         scope: '',
//       });
//     };
//     gapi.load('client:auth2', initClient);

//     const isValid = async () => {
//       const data = await validUser();
//       if (data?.user) {
//         window.location.href = '/chats';
//       }
//     };
//     isValid();
//   }, []);

//   return (
//     <div
//   className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
//   style={{
//     backgroundImage: "url('/chatbg.png')",
//   }}
// >
//   <div className="w-full max-w-md bg-[#1d1f23]/90 p-6 rounded-2xl shadow-xl backdrop-blur-md">
//     {/* Title */}
//     <div className="mb-6">
//       <h2 className="text-3xl font-bold text-white text-center">Login</h2>
//       <p className="text-center text-sm text-gray-400 mt-1">
//         No account?{' '}
//         <Link to="/register" className="text-teal-400 underline">
//           Sign up
//         </Link>
//       </p>
//     </div>

//     {/* Form */}
//     <form onSubmit={formSubmit} className="space-y-4">
//       <input
//         type="email"
//         name="email"
//         required
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleOnChange}
//         className="w-full bg-[#2b2d33] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-400"
//       />

//       <div className="relative">
//         <input
//           type={showPass ? 'text' : 'password'}
//           name="password"
//           required
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleOnChange}
//           className="w-full bg-[#2b2d33] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-400"
//         />
//         <button
//           type="button"
//           onClick={() => setShowPass(!showPass)}
//           className="absolute top-3 right-3 text-white"
//         >
//           {showPass ? <BsEmojiExpressionless size={24} /> : <BsEmojiLaughing size={24} />}
//         </button>
//       </div>

//       {/* Submit */}
//       <button
//         type="submit"
//         className="w-full bg-gradient-to-r from-teal-400 to-yellow-300 text-[#121418] font-bold py-3 rounded-lg relative overflow-hidden"
//       >
//         {isLoading ? (
//           <div className="flex justify-center">
//             <lottie-player
//               src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
//               background="transparent"
//               speed="1"
//               style={{ width: '120px', height: '80px' }}
//               loop
//               autoplay
//             ></lottie-player>
//           </div>
//         ) : (
//           'Login'
//         )}
//       </button>

//       {/* Divider */}
//       <div className="flex items-center justify-center text-white text-sm">
//         <span className="mx-2">or</span>
//       </div>

//       {/* Google Login */}
//       <GoogleLogin
//         clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
//         render={(renderProps) => (
//           <button
//             onClick={renderProps.onClick}
//             disabled={renderProps.disabled}
//             className="flex items-center justify-center border border-teal-400 text-white py-3 w-full rounded-lg hover:bg-[#2b2d33] transition"
//           >
//             <img
//               src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
//               alt="google"
//               className="w-5 h-5 mr-3"
//             />
//             Continue with Google
//           </button>
//         )}
//         onSuccess={googleSuccess}
//         onFailure={googleFailure}
//         cookiePolicy={'single_host_origin'}
//         scope="profile email"
//       />
//     </form>
//   </div>
// </div>

//   );
// }

// export default Login;
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
