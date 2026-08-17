// functions
function renderProfile(user) {
  const avatarContainer = document.getElementById("avatar-container");

  const img = document.createElement("img");
  img.classList.add("avatar-image");
  img.src = user?.profileSrc
    ? user?.profileSrc
    : "./assets/icons/avatar-placeholder.svg";
  img.alt = "Profile image";
  avatarContainer.appendChild(img);
}

function injectGallery(gallery) {
  const galleryContainer = document.querySelector(".gallery-container");
  galleryContainer.prepend(gallery);
}

// exports
export { renderProfile, injectGallery };
