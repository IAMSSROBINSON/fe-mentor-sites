// imports, components
import Profile from "../components/Profile/Profile.js";
import TimeCard from "../components/TimeCard/TimeCard.js";

// elements
const root = document.getElementById("root");

// events
root.addEventListener("click", handleCalendarList);

// functions
function mainViewInit({ user, data, error }) {
  console.log("mainViewInit");
  console.log("mainViewInit user: ", user);
  console.log("mainViewInit data: ", data);
  if (error) {
    console.log("mainViewInit Error", error);
    root.innerHTML = Profile({
      name: "Username",
      imgSrc: "../assets/images/placeholder_user.png",
    });
    return;
  }

  root.innerHTML = Profile(user);

  if (data) {
    renderTimeCards(data);
  }
}

function renderTimeCards(data) {
  data.forEach((stat) => {
    root.innerHTML += TimeCard("weekly", stat);
  });
}

function handleCalendarList(e) {
//   console.log("handleCalendarList", e);
//   console.log("handleCalendarList", e.target);

  const target = e.target;
  if (target.classList.contains('link')) {
    const links = Array.from(document.querySelectorAll('.link'));
    links.forEach((linkEle) => {
        linkEle.classList.remove('selected');
    });
    target.classList.add('selected');
    
    console.log("Link clicked");
  }
}

export default mainViewInit;
