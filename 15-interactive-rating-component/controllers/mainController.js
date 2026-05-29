import { getRating, setRating, resetRating } from '../models/mainModel.js';
import { mainViewInnit, removeAllCheckedClasses, applyCheckedClass, wipeCard, renderThankyouIcon, renderLabel, renderThankYouHeading, renderMessage } from '../views/mainView.js';

// elements
const ratingForm = document.querySelector('.rating-form');
const submitBtn = document.getElementById('submit-btn');


// events
ratingForm.addEventListener("change", handleRating);
ratingForm.addEventListener("submit", handleSubmit);


// functions
function mainControllerInnit () {
    console.log("mainControllerInnit");
    console.log("mainControllerInnit getRating from model: ", getRating());
    mainViewInnit();
};

function handleRating (e) {
    if (e.target.matches('input[type=radio]')) {
        const target = e.target;
        const value = target.value;
        
        const label = document.querySelector(`label[for="${target.id}"]`);
        console.log('label:', label);

        removeAllCheckedClasses();
        applyCheckedClass(label, 'checked');
        setRating(value);
        console.log('newRating:', getRating());
    }
}


function handleSubmit (e) {
    e.preventDefault();
    console.log("handleSubmit");

    const isRatingValidated = validateAnElementIsChecked();
    if (isRatingValidated) {
        const allRatings = Array.from(document.querySelectorAll('.label')).length;

        console.log("submitForm");
        // clear card html
        wipeCard()
        renderThankyouIcon();
        renderLabel(getRating(), allRatings);
        renderThankYouHeading();
        renderMessage();
    } 
    else {
        console.log("Must select a rating to submit form");
    }
}

function validateAnElementIsChecked () {
    const labels = Array.from(document.querySelectorAll('.label'));
    const isOneChecked = labels.some((label) => label.classList.contains('checked'));
    return isOneChecked;
}


export { mainControllerInnit };
