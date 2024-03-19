import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Január', uv: 5, pv: 2, amt: 10 },
  { name: 'Február', uv: 6, pv: 5, amt: 10 },
  { name: 'Március', uv: 2, pv: 2, amt: 10 },
  { name: 'Április', uv: 8, pv: 6, amt: 10 },
  { name: 'Május', uv: 4, pv: 3, amt: 10 },
  { name: 'Június', uv: 5, pv: 4, amt: 10 },
  
];

function Diagram() {
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