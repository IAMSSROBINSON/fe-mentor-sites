import { getRating, setRating, resetRating } from '../models/mainModel.js';
import { mainViewInnit, removeAllCheckedClasses, applyCheckedClass } from '../views/mainView.js';

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
        
        const label = document.querySelector(`label[for="${target.id}"]`);
        console.log('label:', label);

        removeAllCheckedClasses();
        applyCheckedClass(label, 'checked');
    }
}


function handleSubmit (e) {
    e.preventDefault();
    console.log("handleSubmit");
}


export { mainControllerInnit };
