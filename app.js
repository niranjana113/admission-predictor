const $ = (id) => document.getElementById(id);

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function getRecommendations(probability) {
  if (probability >= 0.85) {
    return ["University of Toronto", "Northeastern University", "Arizona State University"];
  }
  if (probability >= 0.65) {
    return ["University of Texas", "Drexel University", "San Jose State University"];
  }
  return ["SUNY Buffalo", "University of Dayton", "NJIT"];
}

function predictAdmission() {
  const cgpa = parseFloat($("cgpa").value) || 0;
  const gre = parseFloat($("gre").value) || 0;
  const toefl = parseFloat($("toefl").value) || 0;
  const research = parseInt($("research").value, 10) || 0;

  const score = -18 + (1.4 * cgpa) + (0.03 * gre) + (0.02 * toefl) + (0.8 * research);
  const probability = Math.max(0, Math.min(0.99, sigmoid(score)));

  $("prob").textContent = `${Math.round(probability * 100)}%`;
  $("recs").innerHTML = getRecommendations(probability)
    .map((school) => `<li>${school}</li>`)
    .join("");
}

$("predict").addEventListener("click", predictAdmission);
predictAdmission();