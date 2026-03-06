import getData from '../database/db.js';
class   ModelManager {

    constructor (userData) {
        this.user = userData;
        this.stats = [];
    }

    async mainModelInit () {
        console.log("mainModelInit fetching data..");
        this.stats = await getData();
        console.log("model:", this.stats);
    }

    get data () {
        return {user: this.user, stats: this.stats};
    }

}

export default ModelManager;