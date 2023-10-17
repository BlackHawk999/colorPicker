const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyColor(event.target.textContent);
  }
});

function randomColorGenerator() {
  const hex = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * hex.length)];
  }

  return "#" + color;
}

function setRandomColors(isInitial) {
  // hash data
  const colors = isInitial ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    // for lock backgroundColor
    const isLocked = col.querySelector("i").classList.contains("fa-lock");

    const colorText = col.querySelector(".colour__title");
    const colorbutton = col.querySelector(".colour__btn");

    // for lock backgroundColor
    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    // for adding colors to hash
    if (!isInitial) {
      colors.push(color);
    }

    colorText.textContent = color;
    col.style.background = color;

    setTextColor(colorText, color);
    setTextColor(colorbutton, color);
  });

  updateColorsHash(colors);
}

function copyColor(text) {
  return navigator.clipboard.writeText(text);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => col.toString().substring(1))
    .join("-");
}

// function for getting colors from hash

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }

  return [];
}

setRandomColors(true);
