const likeButton = document.getElementById('likeButton');

// Initialize the state variable
let isLiked = false;

// Toggle the button state on click
likeButton.onclick = function() {
    isLiked = !isLiked; // Toggle the state

    if (isLiked) {
        likeButton.classList.add('pressed'); // Add class for clicked state
    } else {
        likeButton.classList.remove('pressed'); // Remove class for unclicked state
    }
};
