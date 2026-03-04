import mainViewInit from '../views/mainView.js';
import ModelManager from '../models/mainModel.js';

async function mainControllerInit () {
    // initialize modules
    console.log("mainControllerInit");

    // create instance of model
    const modelManager_1 = new ModelManager("Jeremy Robson");
    
    // init data in model
   try {
    await modelManager_1.mainModelInit();
   }
   catch (err) {
    console.log("controller", err.message);
   }

   // access data from model if successfully awaited
   console.log("controller: ", modelManager_1.data);
  
}
mainControllerInit();

export default mainControllerInit;