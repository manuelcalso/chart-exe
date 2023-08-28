import Chart from 'chart.js/auto';

export const getData = async () => {
  // 1. GENERACIÓN DE DATOS
  const response = await fetch('http://localhost:3000/sales');
  console.log('response', response);

  const data = await response.json();
  console.log('data', data);

  // 2. VISTA INICIAL
  document.querySelector('#app').innerHTML = /* HTML */ `
    <div id="data">
      <div id="table-data">
        ${data
          .map((e) => {
            return `
        <p>Month: ${e.month}</p>
        <p>Value: $${e.total}</p>
      `;
          })
          .join('')}
      </div>
      <div>
        <canvas id="chart-db"></canvas>
      </div>
    </div>
  `;

  // 3. GENERACION DE GRÁFICA

  const myChartDBArea = document.querySelector('#chart-db');
  console.log('myChartDBArea', myChartDBArea);

  new Chart(myChartDBArea, {
    type: 'radar',
    data: {
      labels: data.map((row) => row.month),
      datasets: [
        { label: 'Ventas por mes', data: data.map((row) => row.total) },
      ],
    },
  });
};
