import mainViewInit from "../views/mainView.js";
import ModelManager from "../models/mainModel.js";

const userData = {
  name: "Jeremy Robson",
  imgSrc: "../assets/images/profile.png",
};

const modelManager_1 = new ModelManager(userData);

async function mainControllerInit() {
  try {
    await modelManager_1.mainModelInit();
    //  initialize view and send data for rendering on successful fetch
    mainViewInit({ data: modelManager_1.data });
  } catch (err) {
    // initialize view and send null data to render template only with error message of failed fetch
    return mainViewInit({ data: null, error: err.message });
  }
}

async function mainControllerGetData() {
  const data = await modelManager_1.data;
  return data;
}

export { mainControllerInit, mainControllerGetData };
