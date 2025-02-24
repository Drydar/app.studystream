const puzzleContainer = document.getElementById("puzzle-container");
const message = document.getElementById("message");
const loginContainer = document.getElementById("login-container");
const referenceContainer = document.getElementById("reference-container");
const activationCodeInput = document.getElementById("activation-code");
const phoneNumberInput = document.getElementById("phone-number");
const loginMessage = document.getElementById("login-message");

const VALID_ACTIVATION_CODE = "123456";

let tiles = [];
let correctOrder = [];
let emptyTile = { row: 0, col: 0 };
let draggedTile = null;
let startX = 0, startY = 0;

function validateUser() {
    const phone = phoneNumberInput.value.trim();
    const code = activationCodeInput.value.trim();

    if (!phone || !code) {
        loginMessage.textContent = "Please enter both phone number and activation code.";
        return;
    }

    if (code !== VALID_ACTIVATION_CODE) {
        loginMessage.textContent = "Invalid activation code!";
        return;
    }

    // Hide login, show puzzle
    loginContainer.style.display = "none";
    referenceContainer.style.display = "block";
    puzzleContainer.style.display = "flex";

    createPuzzle();
}

function createPuzzle() {
    tiles = [];
    correctOrder = [];
    puzzleContainer.innerHTML = "";

    for (let i = 0; i < 8; i++) {
        let row = Math.floor(i / 3);
        let col = i % 3;

        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.style.backgroundImage = "url('picture_puzzle.png')";
        tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        tile.dataset.index = i + 1;
        tile.style.left = `${col * 100}px`;
        tile.style.top = `${row * 100}px`;

        tile.addEventListener("mousedown", startDrag);
        tile.addEventListener("touchstart", startDrag);

        tile.addEventListener("mouseup", stopDrag);
        tile.addEventListener("touchend", stopDrag);

        tiles.push({ element: tile, row, col });
        correctOrder.push(i + 1);
        puzzleContainer.appendChild(tile);
    }

    emptyTile = { row: 0, col: 0 }; // Empty space in top-left corner
    shuffleTiles();
}

function shuffleTiles() {
    message.textContent = "";
    let positions = [...Array(9).keys()].sort(() => Math.random() - 0.5);

    tiles.forEach((tileObj, i) => {
        let pos = positions[i + 1];
        let row = Math.floor(pos / 3);
        let col = pos % 3;

        tileObj.row = row;
        tileObj.col = col;
        tileObj.element.style.left = `${col * 100}px`;
        tileObj.element.style.top = `${row * 100}px`;
    });

    emptyTile = { row: Math.floor(positions[0] / 3), col: positions[0] % 3 };
}

function startDrag(event) {
    event.preventDefault();
    draggedTile = tiles.find(t => t.element === event.target);
    if (!draggedTile) return;

    let touch = event.touches ? event.touches[0] : event;
    startX = touch.clientX;
    startY = touch.clientY;

    document.addEventListener("mousemove", dragTile);
    document.addEventListener("touchmove", dragTile);
}

function dragTile(event) {
    if (!draggedTile) return;
    let touch = event.touches ? event.touches[0] : event;
    
    let dx = touch.clientX - startX;
    let dy = touch.clientY - startY;

    draggedTile.element.style.transform = `translate(${dx}px, ${dy}px)`;
}

function stopDrag(event) {
    if (!draggedTile) return;

    draggedTile.element.style.transform = "";
    let row = draggedTile.row;
    let col = draggedTile.col;

    if (isAdjacent(row, col, emptyTile.row, emptyTile.col)) {
        swapTiles(draggedTile, emptyTile);
        emptyTile.row = row;
        emptyTile.col = col;
        checkWin();
    }

    draggedTile = null;
    document.removeEventListener("mousemove", dragTile);
    document.removeEventListener("touchmove", dragTile);
}

function isAdjacent(r1, c1, r2, c2) {
    return (Math.abs(r1 - r2) === 1 && c1 === c2) || (Math.abs(c1 - c2) === 1 && r1 === r2);
}

function swapTiles(tile, empty) {
    tile.element.style.left = `${empty.col * 100}px`;
    tile.element.style.top = `${empty.row * 100}px`;

    let tempRow = tile.row;
    let tempCol = tile.col;

    tile.row = empty.row;
    tile.col = empty.col;

    empty.row = tempRow;
    empty.col = tempCol;
}

function checkWin() {
    let isCorrect = tiles.every((tile, index) => tile.row * 3 + tile.col === index);
    if (isCorrect) {
        message.textContent = "You Win!";
        sendWinNotification();
    }
}

function sendWinNotification() {
    fetch("https://formspree.io/f/mnnnyzvg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumberInput.value, message: "User won the puzzle!" })
    });
}

createPuzzle();