class StateManager {
    constructor (data = [], theme = "light") {
        this.data = data;
        this.theme = theme;
    }

    mainModelInit() {
        console.log("mainModelInit");
    }

    setTheme (theme) {
        this.theme = theme;
    }


}

export default StateManager;