import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Learn from './Pages/Learn/Learn';
import Gallery from './Pages/Gallery/Gallery';
import Contact from './Pages/Contact/Contact';
import NotFound from './Pages/NotFound/NotFound';
import SignUp from './Pages/SignUp/SignUp';
import SignIn from './Pages/Login/Login';
import Practice from './Pages/Practice/Practice';
import { GetUsers, ProtectedRoute } from './components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/users" element={<ProtectedRoute allowedProfiles={['admin']}><GetUsers /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);