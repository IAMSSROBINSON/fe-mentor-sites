// imports

// functions
function mainGalleryInit () {
    console.log("mainGalleryInit");
}


function renderMainGalleryImage (mainImageSrc, className) {
    const productImage = document.querySelector('.product-image');
    productImage.classList = `product-image ${className}`;

    productImage.src = mainImageSrc;
}

function renderProduct (data) {
        console.log("renderProduct gotData:", data);
        const galleryMainImageContainer = document.querySelector(".gallery-main-image-container");
        galleryMainImageContainer.addEventListener('click', handleMainImageClick);

        const mainProductImage = document.querySelector('.product-image');
        mainProductImage.src = data.images[0];
        galleryMainImageContainer.prepend(mainProductImage);

        renderThumbnails(data);
}

function handleMainImageClick(e) {
  console.log("handleMainImageClicked");
}

function renderInformation (data) {
    console.log("renderInformation:", data);
    const brandName = document.querySelector('.product-label');
    brandName.textContent = data.brandName;

    const name = document.querySelector('.product-title');
    name.textContent = data.name;

    const description = document.querySelector('.product-description');
    description.textContent = data.description;

    const productPrice = document.querySelector('.product-price');
    const price = data.isDiscounted ? (data.price * data.discountPercentage /100).toFixed(2) : data.price.toFixed(2);
    productPrice.textContent = `$${price}`;

    const productDiscount = document.querySelector('.product-discount');
    productDiscount.textContent = data.isDiscounted ? data.discountPercentage + "%" : "";

    const previousPrice = document.querySelector('.product-previous-price');
    previousPrice.textContent = `$${data.price.toFixed(2)}`;

    const addToCartButton = document.querySelector('.add-to-cart-button');
    addToCartButton.id = data.id;
    addToCartButton.dataset.productId = data.id;
    console.log("addToCartButton", addToCartButton);

}

function renderThumbnails (data) {
    const thumbnailsArr = data.thumbnails;
    console.log("renderThumbnails:", thumbnailsArr);
    const thumbNailGalleryContainer = document.querySelector('.thumbnail-gallery-container');

    thumbnailsArr.forEach((thumbnailSrc, index) => {
        const button = document.createElement('button');
        button.id = `product-${index+1}`
        button.classList.add(`product-${index+1}-button`, 'thumbnail-button');
        if (index === 0) {
            button.classList.add('selected');
            button.setAttribute("tabindex", "0");
           
        } else {
            button.setAttribute('tabindex', '-1');
        }

         button.addEventListener('keydown', handleButtonRoving)
        
        const img = document.createElement("img");
        img.src = thumbnailSrc;
        img.classList.add('thumbnail', `product-${index + 1}`);
        img.alt = `Luxury sneakers ${index === 0 ? "front" : index === 1 ? "back" : index === 2 ? "right side" : "left side"} view`;
        button.appendChild(img);
        thumbNailGalleryContainer.appendChild(button);
    });

    thumbNailGalleryContainer.addEventListener("click", (e) => {
        handleThumbnailClick(e, data)
    });
}

function handleArrowClick(e, product) {
  const button = e.target.closest(".arrow-container");
  if (button) {
    const id = button.id;
    const pathname = new URL(document.querySelector(".product-image").src)
      .pathname;
    const allImages = product.images;
    const indexOfCurrentImage = allImages.indexOf(pathname);
    console.log("indexOfCurrentImage:", indexOfCurrentImage);
    if (id === "previous-arrow-container") {
      let newIndex = indexOfCurrentImage - 1;
      if (newIndex < 0) {
        newIndex = allImages.length - 1;
      }
      const newPathname = allImages[newIndex];
      const className = `product-${newIndex + 1}`;
      console.log("className: previous", className);
      renderMainGalleryImage(newPathname, className);
    } else {
      let newIndex = indexOfCurrentImage + 1;
      if (newIndex > allImages.length - 1) {
        newIndex = 0;
      }
      const className = `product-${newIndex + 1}`;
      console.log("className: next", className);
      const newPathname = allImages[newIndex];
      renderMainGalleryImage(newPathname, className);
    }
  }
}

function handleThumbnailClick(e, data) {
  console.log("handleThumbnailClick");
  const targetButton = e.target.closest("button");
  console.log(
    "handleThumbnailClick button:",
    targetButton.firstChild.classList[1],
  );
  const productClass = targetButton.firstChild.classList[1];
  const mainImageSrc = data.images.filter(
    (src) => src === `/assets/images/image-${productClass}.jpg`,
  )[0];
  console.log("mainImageSrc", mainImageSrc);

  const allThumbnailButtons = Array.from(
    document.querySelectorAll(".thumbnail-button"),
  );

  if (targetButton) {
    renderSelectedThumbnailButton(allThumbnailButtons, targetButton);
    renderMainGalleryImage(mainImageSrc);
  }
  return;
}

function renderSelectedThumbnailButton(allThumbnailsArr, selectedThumbnail) {
    allThumbnailsArr.forEach((thumbnail) => {
        thumbnail.classList.remove('selected');
    });
    selectedThumbnail.classList.add('selected');
}

function handleButtonRoving(e) {
  const target = e.target.closest("button");

  const allThumbnailButtons = Array.from(
    document.querySelectorAll(".thumbnail-button"),
  );

  const indexOfCurrentThumbnail = allThumbnailButtons.indexOf(target);

  if (indexOfCurrentThumbnail === -1) {
    console.log("cannot find current image in list");
    return;
  }

  let newIndex;
  const key = e.key;

  if (key !== "ArrowRight" && key !== "ArrowLeft") return;

  if (key === "ArrowRight") {
    console.log("ArrowRight clicked");

    newIndex = indexOfCurrentThumbnail + 1;
    if (newIndex > allThumbnailButtons.length - 1) {
      newIndex = 0;
    }
  } else if (key === "ArrowLeft") {
    console.log("ArrowLeft Clicked.");

    if (indexOfCurrentThumbnail - 1 < 0) {
      newIndex = allThumbnailButtons.length - 1;
    } else {
      newIndex = indexOfCurrentThumbnail - 1;
    }
  }

  const nextButton = allThumbnailButtons[newIndex];
  target.setAttribute("tabindex", "-1");
  nextButton.setAttribute("tabindex", "0");
  nextButton.focus();
  renderSelectedThumbnailButton(allThumbnailButtons, nextButton);
  renderMainImageFromArrowClick(nextButton);
}

function renderMainImageFromArrowClick(button) {
  const buttonId = button.id;

  const mainImageSrc = getProducts()[0].images.filter(
    (src) => src === `/assets/images/image-${buttonId}.jpg`,
  )[0];

  renderMainGalleryImage(mainImageSrc);
}


export { mainGalleryInit, renderMainGalleryImage, renderProduct, renderInformation, handleArrowClick, handleThumbnailClick, renderSelectedThumbnailButton, handleButtonRoving };