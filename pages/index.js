import Head from 'next/head';
import { useState } from 'react';
import Sopr from '../components/sopr';

export default function Home() {
    const [chartName, setChartName] = useState('sopr1');

  return (
      <div className="container">
          <div className="charts-list">
              <h4>Chart:</h4>
              <button onClick={() => setChartName('sopr1')}>sopr1</button>
              <button onClick={() => setChartName('sopr2')}>sopr2</button>
              <button onClick={() => setChartName('sopr3')}>sopr3</button>
          </div>
          { chartName === 'sopr1' ? <Sopr/> : ''}
          { chartName === 'sopr2' ? <Sopr/> : ''}
          { chartName === 'sopr3' ? <Sopr/> : ''}
      </div>
  )
}
