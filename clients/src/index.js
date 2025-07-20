// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux';
// import store from './store';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//       <ToastContainer position="top-right" />
//     </Provider>
//   </React.StrictMode>
// );

// reportWebVitals();
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux';
// import store from './store';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// // Make sure your .env has REACT_APP_GOOGLE_CLIENT_ID set.

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       {/* Wrap App with GoogleOAuthProvider */}
//       <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//         <App />
//         <ToastContainer position="top-right" />
//       </GoogleOAuthProvider>
//     </Provider>
//   </React.StrictMode>
// );

// reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Make sure your .env has REACT_APP_GOOGLE_CLIENT_ID set.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <App />
          <ToastContainer position="top-right" />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();


