import getData from '../database/db.js';

// async function mainModelInit() {
//     console.log("mainModelInit");

//     const data = await getData();
//     console.log("data: ", await data.quizzes);
// }

class StateManager {

    constructor () {
            this.theme = "light";
            this.data = [];
            
    }

    async mainModelInit () {
        console.log("mainModelInit");
        const data = await getData();
        console.log("data: ", await data.quizzes);

        const isStorage = localStorage.getItem('quizApp');
        console.log("isStorage:", isStorage ? true : false);

        // if there is no local storage, handle setting it up, else set values
        if (!isStorage) {
            console.log("localStorageNotFound:");
            // create object instance to store data: from getData() and theme: from getColorScheme()
            const obj = {
                data: data.quizzes,
                theme: this.getColorScheme()
            }

            // set theme and data main properties on this class and assign to values from object instance
            this.setData = obj.data;
            this.setTheme = obj.theme;

            // set theme and data to local storage, remember to update when theme changes via switch
            localStorage.setItem('quizApp', JSON.stringify(obj));
            console.log("localStorageHas", JSON.parse(localStorage.getItem("quizApp")));
            console.log("StateManager set to:","\ndata:",this.data, "\ntheme:", this.theme);
            return;
        } else {
            console.log("localStorageFound:");

            // parse localstorage string into js object
            const storageObj = JSON.parse(isStorage);
            console.log("storageObj:", storageObj);

            // set this class instance with data and theme key: value via setters
            this.setData = storageObj.data;
            this.setTheme = storageObj.theme;
             
            console.log("StateManager set to:","\ndata:",this.getData, "\ntheme:", this.getTheme);    
        }

       
    }


    set setTheme (theme) {
        console.log("setTheme:", theme);
        this.theme = theme;
    }

    set setData (data) {
        console.log("setData:", data);
        this.data = data;
    }

    get getData () {
        console.log("getData:", this.data);
        return this.data;
    }

    get getTheme () {
        console.log("getTheme:", this.theme);
        return this.theme;
    }


    getColorScheme () {
        // check if there a preferred color scheme set on the users system, if dark mode set then return dark else return light for default color theme
        const theme = matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";

        // get the root html document element
        const docEl = document.documentElement;

        // set data-theme = theme, on documentElement so css will apply default color system styles, dark mode will be set in css variables applied with attribute selector [data-theme: "dark"] { // --darkMode variables set here }
        docEl.dataset.theme = theme;
        console.log("getColorScheme:", theme);
        return theme;
    }
}

export default StateManager;