function toggleClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}

const likeButtons = document.querySelectorAll('.like-button');

likeButtons.forEach(likeButton => {
    likeButton.addEventListener('click', () => toggleClass(likeButton, 'pressed'));
});
