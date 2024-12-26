import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Create a router with the future flag
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
