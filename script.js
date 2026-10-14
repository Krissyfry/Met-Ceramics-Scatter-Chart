// Get the popup and picture from the HTML.
const popup = document.getElementById('picture-popup');
const picture = document.getElementById('artwork-image');
const title = document.getElementById('artwork-title');
// Write every point directly. No loops.
const datasets = [
  {
    label: 'Earthenware',
    backgroundColor: '#ad6247',
    pointRadius: 7,
    data: [
      { x: -50, y: 1, artwork: artworks[0] },
      { x: 250, y: 1, artwork: artworks[1] },
      { x: 1487, y: 1, artwork: artworks[11] },
      { x: 1550, y: 1, artwork: artworks[14] },
      { x: 1587, y: 1, artwork: artworks[16] },
      { x: 1680, y: 1, artwork: artworks[17] },
      { x: 1684, y: 1, artwork: artworks[18] }
    ]
  },
  {
    label: 'Stoneware',
    backgroundColor: '#80754d',
    pointRadius: 7,
    data: [
      { x: 1000, y: 2, artwork: artworks[2] },
      { x: 1174, y: 2, artwork: artworks[3] },
      { x: 1224, y: 2, artwork: artworks[4] },
      { x: 1250, y: 2, artwork: artworks[5] },
      { x: 1350, y: 2, artwork: artworks[6] },
      { x: 1450, y: 2, artwork: artworks[8] },
      { x: 1450, y: 2, artwork: artworks[9] },
      { x: 1485, y: 2, artwork: artworks[10] },
      { x: 1500, y: 2, artwork: artworks[12] },
      { x: 1500, y: 2, artwork: artworks[13] }
    ]
  },
  {
    label: 'Porcelain',
    backgroundColor: '#b58c63',
    pointRadius: 7,
    data: [
      { x: 1416, y: 3, artwork: artworks[7] },
      { x: 1581, y: 3, artwork: artworks[15] },
      { x: 1690, y: 3, artwork: artworks[19] },
      { x: 1718, y: 3, artwork: artworks[20] },
      { x: 1757, y: 3, artwork: artworks[21] },
      { x: 1774, y: 3, artwork: artworks[22] },
      { x: 1780, y: 3, artwork: artworks[23] }
    ]
  }
];

// Draw the scatter chart.
const chart = new Chart(document.getElementById('ceramic-chart'), {
  type: 'scatter',
  data: { datasets: datasets },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      title: { display: true, text: 'Met ceramics: date and material' },
      legend: {
        position: 'bottom',
        onClick: function () {} // The legend only explains the colors.
      },
      tooltip: {
        callbacks: {
          label: function (point) {
            return point.raw.artwork.title + ' — ' + point.raw.artwork.date;
          }
        }
      }
    },
    scales: {
      x: { title: { display: true, text: 'Year (negative = BCE)' } },
      y: {
        min: 0, max: 4,
        title: { display: true, text: 'Material' },
        ticks: {
          stepSize: 1,
          callback: function (value) {
            if (value === 1) return 'Earthenware';
            if (value === 2) return 'Stoneware';
            if (value === 3) return 'Porcelain';
            return '';
          }
        }
      }
    },
    onClick: function (event, dots) {
      if (dots.length === 0) return;
      const dot = dots[0];
      const group = chart.data.datasets[dot.datasetIndex];
      const selectedPoint = group.data[dot.index];
      const artwork = selectedPoint.artwork;
      picture.classList.remove('spin');
      picture.src = artwork.image;
      picture.alt = artwork.title;
      title.textContent = artwork.title + ' — ' + artwork.date;
      popup.showModal();
    }
  }
});

// Spin the picture after it loads.
picture.onload = function () {
  picture.classList.add('spin');
};

// Close the popup.
document.getElementById('close-popup').onclick = function () {
  popup.close();
};
