import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import RecordEmotion from './pages/RecordEmotions/RecordEmotion';
import Navbar from './navigationBar/navbar.jsx';
import Footer from './footer/Footer.jsx';
import DetectorPage from './pages/DetectorPage/DetectorPage.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div> <Navbar changeColor = {true}></Navbar> <HomePage/> <Footer marginTop={50}></Footer></div>} />
        <Route path="/recorder" element={ <div><Navbar changeColor = {false}></Navbar> <RecordEmotion navBarColor="rgba(22, 37, 57)"></RecordEmotion> <Footer marginTop={0}> </Footer> </div>} />
        <Route path="/detector" element={<div> <Navbar changeColor = {false}></Navbar> <DetectorPage/> <Footer marginTop={5}></Footer></div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
