import React from 'react';
import Map from './components/Map';
import Header from './components/Header';
import './App.css';

const App = () => {
  return (
    <div className="page_container">
      <Header />
      <Map />
    </div>
  );
};

export default App;
