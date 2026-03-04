import getData from '../database/db.js';
class   ModelManager {

    // make data private, accessible via getter and setter
    #data = {};

    constructor (name) {
        this.name = name;
    }

    async mainModelInit () {
        console.log("mainModelInit fetching data..");
        this.#data = await getData();
    }

    get data () {
        return this.#data;
    }

    set data (value) {
        this.data = value;
    }

    

}

export default ModelManager;