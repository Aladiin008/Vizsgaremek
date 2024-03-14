import React from 'react';
import { Bar } from 'react-chartjs-2';

function App() {
  const data = {
    labels: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június'],
    datasets: [
      {
        label: 'Féléves örökbefogadási számok',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [3, 2, 5, 1, 2, 4],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: 'Féléves örökbefogadási számok',
      fontSize: 20,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <h1>Féléves örökbefogadási számok</h1>
      <Bar data={data} options={options} />
    </div>
  );
}

export default App;