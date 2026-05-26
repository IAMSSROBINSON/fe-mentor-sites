import { getRating, setRating, resetRating } from '../models/mainModel.js';
import mainViewInnit from '../views/mainView.js';

function mainControllerInnit () {
    console.log("mainControllerInnit");
    console.log("mainControllerInnit getRating from model: ", getRating());
    mainViewInnit();
};


export { mainControllerInnit };
