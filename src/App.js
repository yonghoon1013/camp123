import axios from 'axios';
import './Reset.scss';
import './App.scss';
import Home from './page/Home';
import List from './page/List';
import Detail from './page/Detail';
import Header from './component/Header';
import Context, { MyContext } from './Context';
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Link } from 'react-router-dom';

function App() {


  const [hamOpne, setHamOpne] = useState(false);

  const hamToggle = () => {
    setHamOpne(!hamOpne);
  }

  return (
    <Context>
      <HashRouter>
        <>

        </>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/list' element={<List />} />
          <Route path='/detail/:contentId' element={<Detail />} />
        </Routes>
      </HashRouter>
    </Context>
  );
}

export default App;
