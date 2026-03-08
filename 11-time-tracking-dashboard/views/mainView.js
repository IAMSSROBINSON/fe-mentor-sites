// imports, components
import {mainControllerGetData} from '../controllers/mainController.js';
import Profile from "../components/Profile/Profile.js";
import TimeCard from "../components/TimeCard/TimeCard.js";

// elements
const root = document.getElementById('root');
const profileContainer = document.getElementById('profile-container');
const cardsContainer = document.getElementById('time-cards-container');
const errorMessageContainer = document.getElementById('error-message-container');

// events


// functions
function mainViewInit({data, error}) {
  console.log("mainViewInit");
  
  if (error) {
    // render template user and stats
    console.log("mainViewInit no data: ", data);

    // display error message in ui to refresh and try again
    return;
  }
  // render user and stats
    console.log("mainViewInit data: ", data);
}

export default mainViewInit;