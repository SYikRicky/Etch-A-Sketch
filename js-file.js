var style = window.getComputedStyle(document.body);

const initializeDrawingProperties = () => {
    const grids = document.querySelectorAll(".grid");

    let isMouseDown = false;
    document.addEventListener("mousedown", () => {
        isMouseDown = true;
    });
    document.addEventListener("mouseup", () => {
        isMouseDown = false;
    });
    grids.forEach(grid => {
        grid.addEventListener("click", (e) => {
            e.target.style.backgroundColor = "black";
        });

        grid.addEventListener("mouseover", (e) => {
            if(isMouseDown) {
                e.target.style.backgroundColor = "black";
            }
        });
    });
};

const makeRows = (rows, cols) => {
    const container = document.querySelector("#gridContainer");
    for (let i = 0; i < (rows * cols); i++) {
        const grid = document.createElement("div");
        container.appendChild(grid).className = "grid";
    }
    initializeDrawingProperties();
};

makeRows(16,16);

const resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", () => {
    const grids = document.querySelectorAll(".grid");
    grids.forEach(grid => {
        grid.style.backgroundColor = style.getPropertyPriority("--lavender-web");
    })
});

const openSettingBtn = document.querySelector("#btnContainer #setting");
const closeSettingBtn = document.querySelector("#setting-popup .close-button");
const overlay = document.getElementById("overlay");

openSettingBtn.addEventListener("click", () => {
    const popup = document.querySelector(".setting-popup");
    openPopup(popup);
});

closeSettingBtn.addEventListener("click", () => {
    const popup = document.querySelector(".setting-popup.active");
    closePopup(popup);
});

const openPopup = (popup) => {
    if (popup === null) return;
    popup.classList.add("active");
    overlay.classList.add("active");
};

const closePopup = (popup) => {
    if (popup === null) return;
    popup.classList.remove("active");
    overlay.classList.remove("active");
};

const slideValue = document.querySelector(".slide-value");
const inputSlideValue = document.querySelector(".slide-container input");

inputSlideValue.value = 16;
let value = inputSlideValue.value;
slideValue.textContent = `${value} x ${value}`;

inputSlideValue.oninput = () => {
    let value = inputSlideValue.value;
    slideValue.textContent = `${value} x ${value}`;
};

const settingSaveBtn = document.querySelector(".setting-popup .save-button");

settingSaveBtn.addEventListener("click", () => {
    const container = document.querySelector("#gridContainer");
    const gridNumber = inputSlideValue.value;
    container.style.setProperty("--grid-number", gridNumber);
    container.replaceChildren();
    makeRows(gridNumber, gridNumber);
    
    const popup = document.querySelector(".setting-popup.active");
    closePopup(popup);
});

