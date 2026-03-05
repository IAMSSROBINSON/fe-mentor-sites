const root = document.getElementById("root");

import Profile from '../components/Profile/Profile.js';



function mainViewInit ({user, data, error}) {
    console.log("mainViewInit");
    console.log("mainViewInit user: ", user);
    console.log("mainViewInit data: ", data);
    if (error) {
         console.log("mainViewInit Error", error);
         return;
    }

    root.innerHTML = Profile(user);
    



}

export default mainViewInit;