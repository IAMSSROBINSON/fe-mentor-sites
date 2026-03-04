import mainViewInit from '../views/mainView.js';
import ModelManager from '../models/mainModel.js';

async function mainControllerInit () {
    // initialize controller
    console.log("mainControllerInit");

    // create instance of model
    const modelManager_1 = new ModelManager("Jeremy Robson");
    
    // initialize model and data 
   try {
    await modelManager_1.mainModelInit();
    //  initialize view and send data for rendering on successful fetch
    mainViewInit({name: modelManager_1.name, data: modelManager_1.data});
   }
   catch (err) {
    console.log("controller", err.message);
    // initialize view and send null data to render template only with error message of failed fetch
    mainViewInit({name: modelManager_1.name, data: null, error: err.message});
   }

}
mainControllerInit();

export default mainControllerInit;