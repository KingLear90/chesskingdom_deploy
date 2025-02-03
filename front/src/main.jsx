import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Learn from './Pages/Learn/Learn';
import Gallery from './Pages/Gallery/Gallery';
import Contact from './Pages/Contact/Contact';
import NotFound from './Pages/NotFound/NotFound';
import SignUp from './Pages/SignUp/SignUp';
import SignIn from './Pages/Login/Login';
import Products from './Pages/Products/Products';
import Practice from './Pages/Practice/Practice';
import { GetUsers, ProtectedRoute } from './components';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
      path: '/home',
      element: <Home />,
  },
  {
      path: '/learn',
      element: <Learn />
  },
  {
    path: '/gallery',
    element: <Gallery />,
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/products',
    element: <Products />
  },
  {
    path: '/practice',
    element: <Practice />
  },
  {
    path: '/users',
    element: (
    <ProtectedRoute allowedProfiles={['admin']}>
      <GetUsers />
    </ProtectedRoute>)
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

