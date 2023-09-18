window.addEventListener("load", () => {
  const alive = "🌹";
  const dead = "🥀";
  let gridSize = Math.floor(Math.min(window.innerWidth, window.innerHeight) / 30);
  let runTime;
  let reveal = document.getElementById("reveal");
  let interval;

  const getSquare = (x,y) => {
    if (x < 0 || y < 0 || x >= gridSize || y >= gridSize) return;
    const cell = document.getElementById(`${x}-${y}`);
    if (cell) return cell.innerText;
  }

  function getLiveNeighbors(x, y) {
    let n = 0;
    if (x-1 && y-1 && getSquare(x-1,y-1) == alive) // top-left
      n++;
    if (x && y-1 && getSquare(x,y-1) == alive) // top-center
      n++;
    if (x+1 && y-1 && getSquare(x+1,y-1) == alive) // top-right
      n++;
    if (x-1 && y && getSquare(x-1,y) == alive) // middle-left
      n++;
    if (x+1 && y && getSquare(x+1,y) == alive) // middle-right
      n++;
    if (x-1 && y+1 && getSquare(x-1,y+1) == alive) // bottom-left
      n++;
    if (x && y+1 && getSquare(x,y+1) == alive) // bottom-center
      n++;
    if (x+1 && y+1 && getSquare(x+1,y+1) == alive) // bottom-right
      n++;
    return n;
  }
  
  function init() {
    const grid = document.getElementById("grid");
    grid.addEventListener("click", init);
    grid.innerHTML = "";
    runTime = 1000;
    reveal.innerHTML = "⚇";
    for (let i = 0; i < gridSize; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < gridSize; j++) {
        const td = document.createElement("td");
        td.innerText = Math.random() > 0.5 ? dead : alive;
        td.id = `${i}-${j}`;
        tr.appendChild(td);
      }
      grid.appendChild(tr);
    }
    interval = setInterval(play, 50);
  }

  function play() {
    if (runTime < 0) {
      reveal.innerHTML = "⚉";
      clearInterval(interval);
      return;
    }
    runTime--;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const cell = document.getElementById(`${i}-${j}`);
        const liveNeighbors = getLiveNeighbors(i,j);
        if (cell.innerText == alive) { // live cell
          if (liveNeighbors < 2 || liveNeighbors >= 4) cell.innerText = dead;
        } else { // dead cell
          if (liveNeighbors == 3) cell.innerText = alive;
        }
      }
    }
  }

  init();
});