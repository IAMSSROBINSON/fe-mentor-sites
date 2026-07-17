// // imports
// import { mainGalleryInit, renderMainGalleryImage, renderProduct, renderInformation, renderSelectedThumbnailButton } from "../views/galleryView.js";


// // functions
// function galleryControllerInit (products) {
//     const galleryMainImageContainer = document.querySelector(".gallery-main-image-container");
//     galleryMainImageContainer.addEventListener('click', handleMainImageClick);

//     const thumbnailGalleryContainer = document.querySelector('.thumbnail-gallery-container');


//     console.log("galleryControllerInit", products);
//     const product = products[0];
//     mainGalleryInit();
//     renderProduct(product, galleryMainImageContainer);
//     renderThumbnails(product, thumbnailGalleryContainer);
//     renderInformation(product);

//       galleryMainImageContainer.addEventListener("click", (e) => {
//     handleArrowClick(e, products[0]);
//   });

 
// }

// function handleMainImageClick(e) {
//   console.log("handleMainImageClicked");
// }

// function handleArrowClick(e, product) {
//   const button = e.target.closest(".arrow-container");
//   if (button) {
//     const id = button.id;
//     const pathname = new URL(document.querySelector(".product-image").src)
//       .pathname;
//     const allImages = product.images;
//     const indexOfCurrentImage = allImages.indexOf(pathname);
//     console.log("indexOfCurrentImage:", indexOfCurrentImage);
//     if (id === "previous-arrow-container") {
//       let newIndex = indexOfCurrentImage - 1;
//       if (newIndex < 0) {
//         newIndex = allImages.length - 1;
//       }
//       const newPathname = allImages[newIndex];
//       const className = `product-${newIndex + 1}`;
//       console.log("className: previous", className);
//       renderMainGalleryImage(newPathname, className);
//     } else {
//       let newIndex = indexOfCurrentImage + 1;
//       if (newIndex > allImages.length - 1) {
//         newIndex = 0;
//       }
//       const className = `product-${newIndex + 1}`;
//       console.log("className: next", className);
//       const newPathname = allImages[newIndex];
//       renderMainGalleryImage(newPathname, className);
//     }
//   }
// }

// function handleButtonRoving(e) {
//   const target = e.target.closest("button");

//   const allThumbnailButtons = Array.from(
//     document.querySelectorAll(".thumbnail-button"),
//   );

//   const indexOfCurrentThumbnail = allThumbnailButtons.indexOf(target);

//   if (indexOfCurrentThumbnail === -1) {
//     console.log("cannot find current image in list");
//     return;
//   }

//   let newIndex;
//   const key = e.key;

//   if (key !== "ArrowRight" && key !== "ArrowLeft") return;

//   if (key === "ArrowRight") {
//     console.log("ArrowRight clicked");

//     newIndex = indexOfCurrentThumbnail + 1;
//     if (newIndex > allThumbnailButtons.length - 1) {
//       newIndex = 0;
//     }
//   } else if (key === "ArrowLeft") {
//     console.log("ArrowLeft Clicked.");

//     if (indexOfCurrentThumbnail - 1 < 0) {
//       newIndex = allThumbnailButtons.length - 1;
//     } else {
//       newIndex = indexOfCurrentThumbnail - 1;
//     }
//   }

//   const nextButton = allThumbnailButtons[newIndex];
//   target.setAttribute("tabindex", "-1");
//   nextButton.setAttribute("tabindex", "0");
//   nextButton.focus();
//   renderSelectedThumbnailButton(allThumbnailButtons, nextButton);
//   renderMainImageFromArrowClick(nextButton);
// }

// function handleThumbnailClick(e, data) {
//   console.log("handleThumbnailClick");
//   const targetButton = e.target.closest("button");
//   console.log(
//     "handleThumbnailClick button:",
//     targetButton.firstChild.classList[1],
//   );
//   const productClass = targetButton.firstChild.classList[1];
//   const mainImageSrc = data.images.filter(
//     (src) => src === `/assets/images/image-${productClass}.jpg`,
//   )[0];
//   console.log("mainImageSrc", mainImageSrc);

//   const allThumbnailButtons = Array.from(
//     document.querySelectorAll(".thumbnail-button"),
//   );

//   if (targetButton) {
//     renderSelectedThumbnailButton(allThumbnailButtons, targetButton);
//     renderMainGalleryImage(mainImageSrc);
//   }
//   return;
// }

// function renderMainImageFromArrowClick(button) {
//   const buttonId = button.id;

//   const mainImageSrc = getProducts()[0].images.filter(
//     (src) => src === `/assets/images/image-${buttonId}.jpg`,
//   )[0];

//   renderMainGalleryImage(mainImageSrc);
// }

// function renderThumbnails (product, container) {
//     const thumbnailsArr = product.thumbnails;
//     console.log("renderThumbnails:", thumbnailsArr);
    

//     thumbnailsArr.forEach((thumbnailSrc, index) => {
//         const button = document.createElement('button');
//         button.id = `product-${index+1}`
//         button.classList.add(`product-${index+1}-button`, 'thumbnail-button');
//         if (index === 0) {
//             button.classList.add('selected');
//             button.setAttribute("tabindex", "0");
           
//         } else {
//             button.setAttribute('tabindex', '-1');
//         }

//          button.addEventListener('keydown', handleButtonRoving)
        
//         const img = document.createElement("img");
//         img.src = thumbnailSrc;
//         img.classList.add('thumbnail', `product-${index + 1}`);
//         img.alt = `Luxury sneakers ${index === 0 ? "front" : index === 1 ? "back" : index === 2 ? "right side" : "left side"} view`;
//         button.appendChild(img);
//         container.appendChild(button);
//     });

//     thumbNailGalleryContainer.addEventListener("click", (e) => {
//         handleThumbnailClick(e, data)
//     });
// }





// // exports
// export { galleryControllerInit };





/* --------------------------------------------------------- */



// imports
import { renderGallery, renderSelectedThumbnailButton, renderMainImage } from "../views/galleryView.js";






//  functions
function galleryControllerInit (galleryElement, product) {
    console.log("galleryControllerInit:", galleryElement, product);

    renderGallery(galleryElement, product);
    attachGalleryEvents(galleryElement, product);
}

function attachGalleryEvents (galleryElement, product) {
    const thumbnailGalleryContainer = galleryElement.querySelector(".thumbnail-gallery-container");
    thumbnailGalleryContainer.addEventListener("click", (e) => {
        handleThumbnailClick(e, galleryElement, product);
    });
}

function handleThumbnailClick(e, galleryElement, product) {
  console.log("handleThumbnailClick");
  const targetButton = e.target.closest("button");
  if (!targetButton) return;
  const imageNumber = targetButton.dataset.thumbnailNumber;
  const imageIndex = imageNumber - 1 || 0;
  console.log("handleThumbnailClick imageNumber:", imageNumber);


  const allThumbnailButtons = Array.from(
    galleryElement.querySelectorAll(".thumbnail-button"),
  );

  if (targetButton) {
    renderSelectedThumbnailButton(allThumbnailButtons, targetButton);
    renderMainImage(galleryElement, product, imageIndex);
  }
  return;
}



// exports
export { galleryControllerInit };