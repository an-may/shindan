// result.js

document.addEventListener("DOMContentLoaded", () => {
  const resultText = document.getElementById("resultText");
  const resultChart = document.getElementById("resultChart");

  const data = JSON.parse(localStorage.getItem("oshikatsuResult"));
  if (!data) return;

  const maxCategory = Object.keys(data).reduce((a, b) =>
    data[a] > data[b] ? a : b
  );

  resultText.textContent = `あなたは「${maxCategory}」を重視する傾向にあります。`;

  new Chart(resultChart, {
    type: "radar",
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: "あなたの推し活傾向",
        data: Object.values(data),
        borderColor: "#ec79a0",
        backgroundColor: "rgba(252, 232, 230, 0.65)",
        pointBackgroundColor: "#ec79a0"
      }]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 20,
          ticks: {
            stepSize: 5,
            color: "#000"
          },
          pointLabels: {
            color: "#000",
            font: {
              size: 14
            }
          }
        }
      }
    }
  });
});

const retryButton = document.getElementById("retry-btn");
if (retryButton) {
  retryButton.addEventListener("click", () => {
    localStorage.removeItem("oshikatsuResult"); // スコアを消す
    window.location.href = "page1.html"; // 最初のページに戻る
  });
}