
export default function Card (title, text, imgSrc) {
    const cardContainer = document.createElement("article");
    cardContainer.classList.add("card-container");

    const cardImageContainer = document.createElement("div");
    cardImageContainer.classList.add("card-image-container");

    const cardImage = document.createElement("img");
    cardImage.classList.add("card-image");
    cardImage.src = imgSrc;
    cardImage.setAttribute("alt", "Scan QR code image to visit Frontend Mentor");

    const cardContentContainer = document.createElement("div");
    cardContentContainer.classList.add("card-content-container")

    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = title;

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = text;

    cardImageContainer.appendChild(cardImage);
    cardContainer.appendChild(cardImageContainer);
    cardContentContainer.appendChild(cardTitle);
    cardContentContainer.appendChild(cardText);
    cardContainer.appendChild(cardContentContainer);

    return cardContainer;
}