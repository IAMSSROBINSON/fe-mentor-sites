import mainViewInit from '../views/mainView.js';
import ModelManager from '../models/mainModel.js';

const userData = {
    name: "Jeremy Robson",
    imgSrc: '../assets/images/profile.png'
}

async function mainControllerInit () {
    // initialize controller
    console.log("mainControllerInit");

    // create instance of model
    const modelManager_1 = new ModelManager(userData);
    
    // initialize model and data 
   try {
    await modelManager_1.mainModelInit();
    //  initialize view and send data for rendering on successful fetch
    mainViewInit({user: modelManager_1.user, data: modelManager_1.stats});
   }
   catch (err) {
    console.log("controller", err.message);
    // initialize view and send null data to render template only with error message of failed fetch
    mainViewInit({user: modelManager_1.user, data: null, error: err.message});
   }

}
mainControllerInit();

export default mainControllerInit;