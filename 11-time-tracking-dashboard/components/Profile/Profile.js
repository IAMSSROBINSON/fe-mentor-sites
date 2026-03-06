
function Profile({ name,  imgSrc}) {
    console.log("Profile", imgSrc);
 return `
    <header class='user-card'>
      <div class='user-container'>
         <div class='user-avatar-container'>
            <img src=${imgSrc ? imgSrc : '../../assets/images/placeholder_user.png'} alt='user-avatar' class='user-img'/>
         </div>
         <div class='user-information-container'>
            <p class='user-label'>Report for</p>
            <h1 class='user-name'>${name ? name : 'Username'}</h1>
         </div>
      </div>
      <ul class='calendar-list'>
         <li class='calendar-item'>
            <a href='#' id='daily' class='link selected'>Daily</a>
         </li>
         <li class='calendar-item'>
            <a href='#' id='weekly' class='link'>Weekly</a>
         </li>
         <li class='calendar-item'>
            <a href='#' id='monthly' class='link'>Monthly</a>
         </li>
      </ul>
    </header>
 `
}

export default Profile;