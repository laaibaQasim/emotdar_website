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
        <Route path="/" element={<div> <Navbar navBarColor="rgba(22, 37, 57)"></Navbar> <HomePage/> <Footer color = " rgba(22, 37, 57)" marginTop={50} copyRightColor={"rgba(16, 26, 39)"}></Footer></div>} />
        <Route path="/recorder" element={ <div><Navbar navBarColor="rgba(22, 37, 57)"></Navbar> <RecordEmotion navBarColor="rgba(22, 37, 57)"></RecordEmotion> <Footer color = " rgba(22, 37, 57)" marginTop={0} copyRightColor={"rgba(16, 26, 39)"}> </Footer> </div>} />
        <Route path="/detector" element={<div> <Navbar navBarColor="rgba(0, 0, 0)"></Navbar> <DetectorPage/> <Footer color = " rgba(0, 0, 0)" marginTop={0}></Footer></div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
