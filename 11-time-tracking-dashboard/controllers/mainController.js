import mainViewInit from '../views/mainView.js';
import ModelManager from '../models/mainModel.js';

function mainControllerInit () {
    // initials modules
    console.log("mainControllerInit");
    mainViewInit();
    const modelManager = new ModelManager();
    modelManager.mainModelInit();
}
mainControllerInit();

export default mainControllerInit;