const data = {
  name: "Bhelu Singh & Fishki Devi",
  children: [
    {
      name: "Jethu Singh",
      children: [
        { name: "Rajendra" },
        { name: "Tikam" },
        { name: "Vijendra" },
        { name: "Ravindra" },
      ]
    },
    {
      name: "Param Singh",
      children: [
        { name: "Shyam" },
        { name: "Charan" },
        { name: "Raghuveer" },
        { name: "Mahaveer" },
        { name: "Ajay" }
      ]
    },
    {
      name: "Kundan Singh",
      children: [
        { name: "Ashish" },
        { name: "Ayush" },
        { name: "Neha" }
      ]
    }
  ]
};

const tree = document.getElementById("tree");
const svg = document.getElementById("lines");

let scale = 1;
let offsetX = 0;
let offsetY = 0;

/* Render Tree */
function render(node, x, y, level = 0, parent = null) {
  const div = document.createElement("div");
  div.className = "node";
  div.innerText = node.name;
  div.style.left = x + "px";
  div.style.top = y + "px";

  tree.appendChild(div);

  if (parent) {
    drawLine(parent, { x, y });
  }

  if (!node.children) return;

  const gap = 200;
  const startX = x - ((node.children.length - 1) * gap) / 2;

  node.children.forEach((child, i) => {
    render(child, startX + i * gap, y + 120, level + 1, { x, y });
  });
}

/* Draw connector lines */
function drawLine(p1, p2) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  line.setAttribute("x1", p1.x + 80);
  line.setAttribute("y1", p1.y + 40);
  line.setAttribute("x2", p2.x + 80);
  line.setAttribute("y2", p2.y);
  line.setAttribute("stroke", "rgba(255,255,255,0.2)");
  line.setAttribute("stroke-width", "2");

  svg.appendChild(line);
}

/* Zoom */
container.addEventListener("wheel", (e) => {
  e.preventDefault();
  scale += e.deltaY * -0.001;
  scale = Math.min(Math.max(0.5, scale), 2);

  tree.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
});

/* Drag */
let isDragging = false;
let startX, startY;

container.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - offsetX;
  startY = e.clientY - offsetY;
});

container.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  offsetX = e.clientX - startX;
  offsetY = e.clientY - startY;

  tree.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
});

container.addEventListener("mouseup", () => isDragging = false);

/* Search */
document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  document.querySelectorAll(".node").forEach(node => {
    node.classList.remove("highlight");
    if (node.innerText.toLowerCase().includes(value)) {
      node.classList.add("highlight");
    }
  });
});

/* INIT */
render(data, 500, 20);
