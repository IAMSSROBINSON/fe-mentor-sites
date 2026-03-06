// imports, components
import Profile from '../components/Profile/Profile.js';
import TimeCard from '../components/TimeCard/TimeCard.js';

// elements
const root = document.getElementById("root");

// events

// functions
function mainViewInit ({user, data, error}) {
    console.log("mainViewInit");
    console.log("mainViewInit user: ", user);
    console.log("mainViewInit data: ", data);
    if (error) {
         console.log("mainViewInit Error", error);
         root.innerHTML = Profile({name: "Username", imgSrc: '../assets/images/placeholder_user.png'});
         return;
    }

    root.innerHTML = Profile(user);
    
    if (data) {
       renderTimeCards(data)
    }
    



}

function renderTimeCards (data) {
    data.forEach((stat) => {
        root.innerHTML += TimeCard(stat)
    })
}



function handleCalendarList (e) {
    console.log("handleCalendarList", e);
    console.log("handleCalendarList", e.target);
}



export default mainViewInit;