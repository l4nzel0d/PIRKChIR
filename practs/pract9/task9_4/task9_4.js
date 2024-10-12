let drawingModeEnabled = false;
let drawingModeStarted = false;

function createHeart(x, y) {
    let heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    document.body.appendChild(heart);
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 15000);
}

function handleMouseMove(event) {
    if (drawingModeEnabled && drawingModeStarted) {
        createHeart(event.clientX, event.clientY);
    }
}

function toggleDrawingModeEnabled() {
    drawingModeEnabled = !drawingModeEnabled;

    const button = document.getElementById("draw-button");
    if (drawingModeEnabled) {
        button.textContent = "Drawing Mode Enabled"; 
        button.setAttribute("status", "enabled");
        document.addEventListener("mousemove", handleMouseMove);
    } else {
        button.textContent = "Drawing Mode Disabled"; 
        button.setAttribute("status", "disabled"); 
        document.removeEventListener("mousemove", handleMouseMove);
        drawingModeStarted = false; 
    }
}

function toggleDrawingModeStarted(event) {
    if (event.target.id === "draw-button") {
        return; 
    }

    if (drawingModeEnabled) {
        drawingModeStarted = !drawingModeStarted;
    }
}

function clearAllHearts(event) {
    event.preventDefault();
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        heart.remove();
    });
}

// Add event listeners
document.getElementById("draw-button").addEventListener("click", toggleDrawingModeEnabled);
document.addEventListener("click", toggleDrawingModeStarted);
document.addEventListener("contextmenu", clearAllHearts);
