window.onload = function() {
    console.log("onload");
    const coordinatedDiv = document.getElementById('coordinates');

    window.addEventListener('click', (event) => {
        console.log("click");
        const x = event.clientX;
        const y = event.clientY;
        coordinatedDiv.innerHTML = `Click coordinates: x = ${x}, y = ${y}`;
    })


    const image = document.getElementById('center-image');

    function centerImage() {
        const windowWidth = document.documentElement.clientWidth;
        const windowHeight = document.documentElement.clientHeight;
        const imageWidth = image.clientWidth;
        const imageHeight = image.clientHeight;

        const left = (windowWidth - imageWidth) / 2;
        const top = (windowHeight - imageHeight) / 2;

        image.style.position = 'fixed';
        image.style.left = `${left}px`;
        image.style.top = `${top}px`;
    }

    centerImage();
    window.addEventListener('resize', centerImage);
};