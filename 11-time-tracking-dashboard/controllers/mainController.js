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
   }
   catch (err) {
    console.log("controller", err.message);
    // initialize view with null for failed fetch and err message arguments, to render failed setup with template data
    mainViewInit(null, err.message);
   }

   // access data from model if successfully awaited
   console.log("controller: ", modelManager_1.data);
   console.log("controller: ", modelManager_1);
  
   // initialize view and send data through from model, confirm success with 1 argument
   mainViewInit(1, modelManager_1.data);
}
mainControllerInit();

export default mainControllerInit;