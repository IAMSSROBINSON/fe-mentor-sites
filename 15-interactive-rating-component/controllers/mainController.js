import { getRating, setRating, resetRating } from "../models/mainModel.js";
import {
  wipeCard,
  renderThankyouIcon,
  renderLabel,
  renderThankYouHeading,
  renderMessage,
} from "../views/mainView.js";

// elements

// functions
function mainControllerInit() {
    
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

    setRating(value);
  }
}

function handleSubmit(e) {
  e.preventDefault();

  const isRadioChecked = validateRadioIsChecked();
  if (isRadioChecked) {
    const numberOfRatings = Array.from(document.querySelectorAll(".label")).length;

    wipeCard();
    renderThankyouIcon();
    renderLabel(getRating(), numberOfRatings);
    renderThankYouHeading();
    renderMessage();
  } else {
    // "Must select a rating to submit form" - do nothing
  }
}

function validateRadioIsChecked() {
  const form = document.getElementById('rating-form');
  const isChecked = form.querySelector('input[type=radio]:checked');
  return isChecked;
}

export { mainControllerInit };
