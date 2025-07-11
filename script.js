// script.js
//console.log('Hello world!');

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quiz-form");

  const pageMapping = {
    "page1.html": {
      next: "page2.html",
      mapping: {
        q1: "現場・体験",
        q2: "現場・体験",
        q3: "現場・体験",
        q4: "現場・体験",
        q5: "グッズ収集",
        q6: "グッズ収集",
        q7: "グッズ収集",
        q8: "グッズ収集"
      }
    },
    "page2.html": {
      next: "page3.html",
      mapping: {
        q9: "つながり",
        q10: "つながり",
        q11: "つながり",
        q12: "つながり",
        q13: "表現",
        q14: "表現",
        q15: "表現",
        q16: "表現"
      }
    },
    "page3.html": {
      next: "result.html",
      mapping: {
        q17: "考察",
        q18: "考察",
        q19: "考察",
        q20: "考察",
        q21: "自己研鑽",
        q22: "自己研鑽",
        q23: "自己研鑽",
        q24: "自己研鑽"
      }
    }
  };

  // 現在のページファイル名を取得
  const pageName = location.pathname.split("/").pop();

  if (form && pageMapping[pageName]) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const mapping = pageMapping[pageName].mapping;
      const nextPage = pageMapping[pageName].next;

      // データ取得 or 初期化
      const result = JSON.parse(localStorage.getItem("oshikatsuResult")) || {
        "現場・体験": 0,
        "グッズ収集": 0,
        "つながり": 0,
        "表現": 0,
        "考察": 0,
        "自己研鑽": 0
      };

      for (let key in mapping) {
        const val = document.querySelector(`input[name="${key}"]:checked`);
        if (!val) {
          alert("すべての質問に回答してください。");
          return;
        }
        result[mapping[key]] += parseInt(val.value);
      }

      localStorage.setItem("oshikatsuResult", JSON.stringify(result));
      window.location.href = nextPage;
    });
  }

  // 結果ページ処理
  const resultText = document.getElementById("resultText");
  const resultChart = document.getElementById("resultChart");

  if (resultText && resultChart) {
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
          backgroundColor: "rgba(252, 232, 230, 0.65)"
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
  }
});