import { mainControllerInnit } from './controllers/mainController.js';
mainControllerInnit();


// elements
const ratingForm = document.querySelector('.rating-form');




// events
ratingForm.addEventListener("change", handleRating);



// functions
function handleRating (e) {
    if (e.target.matches('input[type=radio]')) {
        const target = e.target;
        
        const label = document.querySelector(`label[for="${target.id}"]`);
        console.log('label:', label);

        removeAllCheckedClasses();
        label.classList.add('checked');
    }
}


function removeAllCheckedClasses () {
    const labels = document.querySelectorAll('label');
    labels.forEach((label) => {
        label.classList.remove('checked');
    });
}