const root = document.getElementById("root");

import Profile from '../components/Profile/Profile.js';



function mainViewInit ({user, data, error}) {
    console.log("mainViewInit");
    console.log("mainViewInit user: ", user);
    console.log("mainViewInit data: ", data);
    if (error) {
         console.log("mainViewInit Error", error);
         root.innerHTML = Profile({name: "Plato", imgSrc: '../assets/images/placeholder_user.png'});
         return;
    }

    root.innerHTML = Profile(user);
    



}

export default mainViewInit;