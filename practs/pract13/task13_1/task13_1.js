const coordinatedDiv = document.getElementById('coordinates');

window.addEventListener('click', (event) => {
    console.log("click");
    const x = event.clientX;
    const y = event.clientY;
    coordinatedDiv.innerHTML = `Click coordinates: x = ${x}, y = ${y}`;
})


const image = document.getElementById('center-image');
const imageContainer = document.getElementById('image-container');

function centerElement(element) {
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    const elementWidth = element.clientWidth;
    const elementHeight = element.clientHeight;

    const left = (windowWidth - elementWidth) / 2;
    const top = (windowHeight - elementHeight) / 2;

    element.style.position = 'fixed';
    element.style.left = `${left}px`;
    element.style.top = `${top}px`;
}

function centerContainerAndImage() {
    centerElement(image);
    centerElement(imageContainer);
}

window.addEventListener('resize', centerContainerAndImage);



window.onload = centerContainerAndImage;