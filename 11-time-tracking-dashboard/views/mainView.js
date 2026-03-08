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
window.addEventListener("click", handleTimeframe);


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
    
  renderProfile(data.user);
  renderStats(data.stats);

    
}

function renderProfile (user) {
   profileContainer.innerHTML = Profile(user);
  
}

function renderStats (stats) {
  console.log("stats", stats)
    const fragment = document.createDocumentFragment();
    console.log("frag", fragment)
    stats.forEach(stat => {
      console.log('stat', stat)
      cardsContainer.innerHTML += TimeCard(stat);
    });
}

function getCurrentTimeframe (e) {
  const target = e.target;
  console.log("getCurrentTimeframe target", e)
  if (target.classList.contains('link')) {
    console.log("Timeframe button clicked");
    console.log("Timeframe button clicked", target);
    const timeframe = target.id
    console.log("timeframe button id: ", timeframe);
    return timeframe;
  }
  return;
}

function removeSelectedTimeframe () {
  console.log("removeSelectedTimeframe")
  const links = document.querySelectorAll('.link');
    console.log("removeSelectedTimeframe links", links)

  links.forEach((item) => {
    item.classList.remove('selected')
    console.log("removeSelectedTimeframe", item);
  });

}

function addSelectedTimeframe(timeframe) {
  const links = document.querySelectorAll('.list');
  links.forEach((item) => {
    if (item.id === timeframe) {
      item.classList.add('selected');
    }
  })
}


function handleTimeframe (e) {
  const currentTimeframe = getCurrentTimeframe(e);
  removeSelectedTimeframe();
  addSelectedTimeframe(currentTimeframe);
}

export default mainViewInit;