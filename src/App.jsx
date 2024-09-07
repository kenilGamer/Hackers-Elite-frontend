import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlantScanner from './PlantScanner';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setData([]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error.message || error.response || error);
      });
  }, []);

  return (
    <div>
      <h1>Plant Scanner</h1>
      <PlantScanner />
      <h2>Plant Data</h2>
      <ul>
        {Array.isArray(data) ? (
          data.map(plant => (
            <li key={plant.id}>{plant.name} - {plant.disease}</li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
};

export default App;
