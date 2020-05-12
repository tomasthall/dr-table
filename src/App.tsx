import React from 'react';
import './App.css';
import Table from './components/Table';
import { config } from './tableConfig';
import { data } from './mockData';

const App = () => {
  return (
    <div className="App">
        <Table data={data} config={config} />
    </div>
  );
}

export default App;
