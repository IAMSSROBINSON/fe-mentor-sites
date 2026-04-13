// imports, components
import { mainControllerGetData } from "../controllers/mainController.js";
import Profile from "../components/Profile/Profile.js";
import TimeCard from "../components/TimeCard/TimeCard.js";

// elements
const root = document.getElementById("root");
const profileContainer = document.getElementById("profile-container");
const cardsContainer = document.getElementById("time-cards-container");
const errorMessageContainer = document.getElementById(
  "error-message-container",
);

// events
window.addEventListener("click", handleTimeframeClicked);

// functions
function mainViewInit({ data, error }) {
  if (error) {
    // display error message in ui to refresh and try again
    renderProfile({name: "username", imgSrc: "../../assets/images/placeholder_user.png" });
    errorMessageContainer.style.display = 'block';
    errorMessageContainer.innerHTML = `<p class="error-message">Error fetching data.</br>Please refresh to try again..</p>`;
    console.error(error);
    return;
  }
  // render user and stats
  renderProfile(data.user);
  renderTimeframeStats(data.stats);
}

function renderProfile(user) {
  profileContainer.innerHTML = Profile(user);
}

function renderTimeframeStats(stats) {
  const timeframe = getCurrentSelectedTimeframe();
  cardsContainer.innerHTML = "";
  stats.forEach((stat) => {
    cardsContainer.innerHTML += TimeCard(timeframe, stat);
  });
}

function getCurrentSelectedTimeframe() {
  const links = document.querySelectorAll(".link");
  let selectedLink = "";
  links.forEach((item) => {
    if (item.classList.contains("selected")) {
      selectedLink = item.id;
    }
  });
  return selectedLink;
}

function removeSelectedTimeframe() {
  const links = document.querySelectorAll(".link");

  links.forEach((item) => {
    item.classList.remove("selected");
  });
}

function addSelectedTimeframe(timeframe) {
  const links = document.querySelectorAll(".link");
  links.forEach((item) => {
    if (item.id === timeframe) {
      item.classList.add("selected");
    }
  });
}

async function handleTimeframeClicked(e) {
  const target = e.target;

  if (e.target.classList.contains("link")) {
    const targetIdTimeframe = target.id;
    removeSelectedTimeframe();

    addSelectedTimeframe(targetIdTimeframe);

    const data = await mainControllerGetData();
    renderTimeframeStats(data.stats);
  }
}

export default mainViewInit;
