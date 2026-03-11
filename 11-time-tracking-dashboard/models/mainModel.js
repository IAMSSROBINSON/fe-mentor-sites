import getData from "../database/db.js";
class ModelManager {
  constructor(userData) {
    this.user = userData;
    this.stats = [];
  }

  async mainModelInit() {
    this.stats = await getData();
  }

  get data() {
    return { user: this.user, stats: this.stats };
  }
}

export default ModelManager;
