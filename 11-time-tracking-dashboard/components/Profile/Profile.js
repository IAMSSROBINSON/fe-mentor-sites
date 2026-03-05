
function Profile({ name,  imgSrc}) {
    console.log("Profile", imgSrc);
 return `
    <h1 class="profile-name">${name}</h1>
    <img src=${imgSrc} alt="some img">
 `
}

export default Profile;