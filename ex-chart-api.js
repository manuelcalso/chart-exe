import Chart from 'chart.js/auto';

export const generateExAPIChart = async () => {
  // 1. GENERACIÓN DE DATOS
  const response = await fetch('https://api.coincap.io/v2/assets');
  const dataResponse = await response.json();
  console.log('data coincap', dataResponse);

  // ORDENAMOS LAS MONEDAS CON MAYOR VALOR Y LUEGO NOS QUEDAMOS CON LAS 5 PRINCIPALES
  const filteredData = dataResponse.data
    .sort(function (a, b) {
      return b.priceUsd - a.priceUsd;
    })
    .slice(0, 5);

  // 2. VISTA INICIAL
  document.querySelector('#app-api').innerHTML = /* HTML */ `
    <div>
      <canvas id="chart-api"></canvas>
    </div>
  `;

  // 3. GENERACIÓN DE GRÁFICA

  const myChartAPIArea = document.querySelector('#chart-api');
  console.log('myChartAPIArea', myChartAPIArea);

  new Chart(myChartAPIArea, {
    type: 'line',
    data: {
      labels: filteredData.map((row) => row.symbol),
      datasets: [
        {
          label: 'Valor en dólares',
          data: filteredData.map((row) => row.priceUsd),
          backgroundColor: ['#152', '#265'],
        },
        {
          label: 'Weighted average price',
          data: filteredData.map((row) => row.vwap24Hr),
          backgroundColor: ['#fff', '#741'],
        },
      ],
    },
  });
};
