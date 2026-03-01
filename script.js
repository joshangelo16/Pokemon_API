const typeColors = {
  fire: "#F08030", water: "#6890F0", grass: "#78C850", electric: "#F8D030",
  psychic: "#F85888", ice: "#98D8D8", dragon: "#7038F8", dark: "#705848",
  fairy: "#EE99AC", normal: "#A8A878", fighting: "#C03028", flying: "#A890F0",
  poison: "#A040A0", ground: "#E0C068", rock: "#B8A038", bug: "#A8B820",
  ghost: "#705898", steel: "#B8B8D0"
};

async function getStats() {
  const name = document.getElementById("pokemon-input").value.trim().toLowerCase();
  const output = document.getElementById("output");

  if (!name) {
    output.style.display = "block";
    output.innerHTML = "<p class='error'>Please enter a Pokémon name.</p>";
    return;
  }

  output.style.display = "block";
  output.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error("Not found");
    const data = await response.json();

    const sprite = data.sprites.front_default;
    const types = data.types.map(t =>
      `<span class='type-badge' style='background:${typeColors[t.type.name] || "#777"}'>${t.type.name}</span>`
    ).join("");

    let statsHTML = "";
    data.stats.forEach(s => {
      const val = s.base_stat;
      const pct = (val / 255 * 100).toFixed(1);
      const color = val >= 100 ? "#4CAF50" : val >= 60 ? "#FFC107" : "#F44336";
      statsHTML += `
        <div class='stat-row'>
          <span class='stat-name'>${s.stat.name}</span>
          <b>${val}</b>
          <span class='bar-bg'>
            <div class='bar-fill' style='width:${pct}%; background:${color}'></div>
          </span>
        </div>`;
    });

    output.innerHTML = `
      <img src="${sprite}" alt="${name}" />
      <h2>${data.name} <small style="font-size:14px; color:#888">#${data.id}</small></h2>
      <div>${types}</div>
      <p style="font-size:13px; color:#555">Height: ${data.height / 10}m &nbsp;|&nbsp; Weight: ${data.weight / 10}kg</p>
      <h3 style="margin-bottom:8px">Base Stats</h3>
      ${statsHTML}
    `;
  } catch (e) {
    output.innerHTML = "<p class='error'>Pokémon not found! Check the name and try again.</p>";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("pokemon-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") getStats();
  });
});








   
