import getData from '../database/db.js';
class   ModelManager {

    data = {};

    constructor (name) {
        this.name = name;
    }

    async mainModelInit () {
        console.log("mainModelInit fetching data..");
        this.data = await getData();
    }




}

export default ModelManager;