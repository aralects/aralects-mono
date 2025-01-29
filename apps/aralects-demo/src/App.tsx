import React from 'react';
import './App.scss';
import homeIndicator from './assets/images/homeIndicator(black).png';
import statusBar from './assets/images/StatusBar(black).png';

function App() {
  return (
    <div className='Background'>
      <div className="App">
        <img src={statusBar} alt='Status Bar' className='status-bar' />
        <img src={homeIndicator} alt='Home Indicator' className='home-indicator' />
      </div>
    </div>
  );
}

export default App;
