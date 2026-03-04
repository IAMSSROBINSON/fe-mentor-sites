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
    mainViewInit({name: modelManager_1.name, data: modelManager_1.data});
   }
   catch (err) {
    console.log("controller", err.message);
    // initialize view with null for failed fetch and err message arguments, to render failed setup with template data
    mainViewInit({name: modelManager_1.name, data: null, error: err.message});
   }

}
mainControllerInit();

export default mainControllerInit;