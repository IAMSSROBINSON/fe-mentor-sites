
function Profile({ name,  imgSrc}) {
    console.log("Profile", imgSrc);
 return `
    <header class='user-card'>
      <div class='user-container'>
         <div class='user-avatar-container'>
            <img src=${imgSrc} alt='user-avatar' class='user-img'/>
         </div>
         <div class='user-information-container'>
            <p class='user-label'>Report for</p>
            <h1 class='user-name'>${name}</h1>
         </div>
      </div>
      <ul class='calendar-list'>
         <li class='calendar-item'>
            <a href='#' id='daily'>Daily</a>
         </li>
         <li class='calendar-item'>
            <a href='#' id='weekly'>Weekly</a>
         </li>
         <li class='calendar-item'>
            <a href='#' id='monthly'>Monthly</a>
         </li>
      </ul>
    </header>
 `
}

export default Profile;