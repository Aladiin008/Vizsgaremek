import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Diagram() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/data');
      if (!response.ok) {
        throw new Error('Hiba az adatok lekérdezése során');
      }
      const jsonData = await response.json();
      const formazottData = jsonData.map(item => ({
        name: item.honapok,
        uv: item.osszallat,
        pv: item.kutyak
      }));
      setData(formazottData);
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="uv" fill="#008080" name= "Összes örökbefogadott állat száma" />
      <Bar dataKey="pv" fill="#00B2CA" name="Örökbefogadott kutyák száma" />
    </BarChart>
  );
}

export default Diagram;