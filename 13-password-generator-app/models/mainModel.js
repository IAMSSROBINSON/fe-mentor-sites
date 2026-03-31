function mainModelInit() {
    console.log("mainModelInit :");
}   

const stateManager = {
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
    range: 0
}



export { mainModelInit, stateManager };