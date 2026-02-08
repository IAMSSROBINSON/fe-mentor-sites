const shareImageContainer = document.querySelector(".share-image-container");
const shareImage = document.querySelector(".share-image");
const tooltipContainer = document.querySelector(".tooltip-container");

shareImageContainer.addEventListener('click', handleShareImageClick);
function handleShareImageClick (e) {
    console.log("Share image container clicked", shareImageContainer); 
    tooltipContainer.classList.toggle("active");
    shareImage.classList.toggle("active");
    shareImageContainer.classList.toggle("active");
}