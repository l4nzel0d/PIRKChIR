const sliderTrack = document.querySelector('.slider-track');
const sliderThumb = document.querySelector('.slider-thumb');

let isDragging = false;
let sliderRect = sliderTrack.getBoundingClientRect();

sliderThumb.addEventListener('mousedown', (event) => {
    isDragging = true;
    sliderRect = sliderTrack.getBoundingClientRect();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

const onMouseMove = (event) => {
    if (!isDragging) return;
    
    let newLeft = event.clientX - sliderRect.left;
    
    if (newLeft < 0) {
        newLeft = 0;
    }
    
    if (newLeft > sliderRect.width) {
        newLeft = sliderRect.width;
    }
    console.log(newLeft);
    sliderThumb.style.left = newLeft + 'px';
};

const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

// Default sliderThumb position
sliderThumb.style.left = (sliderRect.width * .25) + "px"; 