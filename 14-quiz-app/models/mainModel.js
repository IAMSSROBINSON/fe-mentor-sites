import getData from '../database/db.js';

async function mainModelInit() {
    console.log("mainModelInit");

    const data = await getData();
    console.log("data: ", await data);
}

export { mainModelInit };