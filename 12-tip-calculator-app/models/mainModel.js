const stateManager = {
    billAmount: 0,
    tipPercentage: 0,
    numberOfPeople: 0
};


function getTipAmount (state) {
    console.log("getTipAmount:",(state.billAmount / 100) * state.tipPercentage);
    return (state.billAmount / 100) * state.tipPercentage;
}

function getTipsPerPerson (state) {
    const tipAmount = getTipAmount(state);
        console.log("getTipsPerPerson: ", tipAmount / state.numberOfPeople);

    return tipAmount / state.numberOfPeople;
}

function getTotalPerPerson (state) {
    const tipAmount = getTipAmount(state);
    console.log("Model tipAmount: ", tipAmount);
    console.log("Model getTotalPerPerson: ", (state.billAmount + tipAmount) / state.numberOfPeople);
    return (state.billAmount + tipAmount) / state.numberOfPeople;
}

function setBill (value) {
    stateManager.billAmount = value;
    console.log("setBill:", stateManager.billAmount);

}

function setTipPercentage (percent) {
    stateManager.tipPercentage = percent;
    console.log("setTipPercentage:", stateManager.tipPercentage);
}

function setNumberOfPeople (value) {
    stateManager.numberOfPeople = value;
    console.log("setNumberOfPeople:", stateManager.numberOfPeople);
}

export { stateManager, getTipAmount, getTipsPerPerson, getTotalPerPerson, setBill, setTipPercentage, setNumberOfPeople };