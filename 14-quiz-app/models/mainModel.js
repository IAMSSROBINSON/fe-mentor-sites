class StateManager {
    constructor (data = [], theme = "light") {
        this.data = data;
        this.theme = theme;
    }

    mainModelInit() {
        console.log("mainModelInit");
    }


}

export default StateManager;