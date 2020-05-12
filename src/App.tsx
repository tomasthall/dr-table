import React from 'react';
import './App.scss';
import Table from './components/Table';
import { config } from './tableConfig';
import { data } from './mockData';

const App = () => {
  return (
    <div className="App">
        <div className="table-wrapper">
            <Table data={data} config={config} />
        </div>
    </div>
  );
}

export default App;
