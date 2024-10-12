let drawingModeEnabled = false;
let drawingModeStarted = false;
let heartInterval; // Variable to hold the interval ID
let mouseX = 0; // Variable to track the X position of the mouse
let mouseY = 0; // Variable to track the Y position of the mouse
const heartTimeout = 15000;
const heartIntervelRate = 10;

function createHeart(x, y) {
    let heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    document.body.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, heartTimeout);
}

function handleMouseMove(event) {
    // Update mouse position variables
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function toggleDrawingModeEnabled() {
    drawingModeEnabled = !drawingModeEnabled;

    const button = document.getElementById("draw-button");
    if (drawingModeEnabled) {
        button.textContent = "Drawing Mode Enabled"; 
        button.setAttribute("status", "enabled");
    } else {
        button.textContent = "Drawing Mode Disabled"; 
        button.setAttribute("status", "disabled"); 
        drawingModeStarted = false; // Reset drawing mode when disabled
        clearInterval(heartInterval); // Stop creating hearts
    }
}

function toggleDrawingModeStarted(event) {
    if (event.target.id === "draw-button") {
        return; 
    }

    if (drawingModeEnabled) {
        drawingModeStarted = !drawingModeStarted; // Toggle the drawing mode state

        if (drawingModeStarted) {
            // Start creating hearts at a fixed interval
            heartInterval = setInterval(() => {
                createHeart(mouseX, mouseY); // Use the current mouse position
            }, heartIntervelRate); // How often
        } else {
            clearInterval(heartInterval); // Stop creating hearts when drawing mode is not started
        }
    }
}

function clearAllHearts(event) {
    event.preventDefault(); // Prevent the context menu from appearing
    const hearts = document.querySelectorAll('.heart'); 
    hearts.forEach(heart => {
        heart.remove();
    });
}

// Add event listeners
document.getElementById("draw-button").addEventListener("click", toggleDrawingModeEnabled);
document.addEventListener("mousemove", handleMouseMove); 
document.addEventListener("click", toggleDrawingModeStarted);
document.addEventListener("contextmenu", clearAllHearts);
