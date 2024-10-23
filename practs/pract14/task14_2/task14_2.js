const galleryContainer = document.querySelector('.gallery-container');
const mainImageContainer = galleryContainer.querySelector('.main-image-container');
const mainImage = mainImageContainer.querySelector('img');

galleryContainer.addEventListener('click', (event) => {
    previewImage = event.target.closest('.preview-image');
    if (!previewImage) return;
    
    const previewImageSrc = previewImage.getAttribute('src');
    mainImage.setAttribute('src', previewImageSrc);
})