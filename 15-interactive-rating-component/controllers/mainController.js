import { getRating, setRating, resetRating } from "../models/mainModel.js";
import {
  removeAllCheckedClasses,
  applyCheckedClass,
  wipeCard,
  renderThankyouIcon,
  renderLabel,
  renderThankYouHeading,
  renderMessage,
} from "../views/mainView.js";

// elements

// functions
function mainControllerInnit() {
    
  // elements
  const ratingForm = document.querySelector(".rating-form");

  // events
  ratingForm.addEventListener("change", handleRating);
  ratingForm.addEventListener("submit", handleSubmit);
}

function handleRating(e) {
  if (e.target.matches("input[type=radio]")) {
    const target = e.target;
    const value = target.value;
    const label = document.querySelector(`label[for="${target.id}"]`);

    removeAllCheckedClasses();
    applyCheckedClass(label, "checked");
    setRating(value);
  }
}

function handleSubmit(e) {
  e.preventDefault();

  const isRatingValidated = validateAnElementIsChecked();
  if (isRatingValidated) {
    const allRatings = Array.from(document.querySelectorAll(".label")).length;

    wipeCard();
    renderThankyouIcon();
    renderLabel(getRating(), allRatings);
    renderThankYouHeading();
    renderMessage();
  } else {
    // "Must select a rating to submit form" - do nothing
  }
}

function validateAnElementIsChecked() {
  const labels = Array.from(document.querySelectorAll(".label"));
  const isOneChecked = labels.some((label) =>
    label.classList.contains("checked"),
  );
  return isOneChecked;
}

export { mainControllerInnit };
