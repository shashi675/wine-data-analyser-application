import React from 'react';
import './App.css';
import Flavonoids from './components/Flavanoids';
import Gamma from './components/Gamma';

function App() {
  return (
    <div className="App">
      <h1>Wine Data Analyser Application</h1>
      <Flavonoids />
      <Gamma />
    </div>
  );
}

export default App;
