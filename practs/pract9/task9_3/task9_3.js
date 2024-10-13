function toggleClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}

function updateCounter(element) {
    const counter = element.querySelector('.counter');
    let currentCount = parseInt(counter.textContent) || 0;

    if (element.classList.contains('pressed')) {
        counter.textContent = currentCount + 1;
    } else {
        counter.textContent = currentCount - 1;
    }
}

const likeButtons = document.querySelectorAll('.like-button');

likeButtons.forEach(likeButton => {
    likeButton.addEventListener('click', () => {
        toggleClass(likeButton, 'pressed');
        updateCounter(likeButton);
    });
});
