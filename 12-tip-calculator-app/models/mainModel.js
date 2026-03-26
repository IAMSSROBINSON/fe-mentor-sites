const stateManager = {
  billAmount: 0,
  tipPercentage: 0,
  numberOfPeople: 0,
};

function getTipAmount(state) {
  return (state.billAmount / 100) * state.tipPercentage;
}

function getTipsPerPerson(state) {
  const tipAmount = getTipAmount(state);

  if (state.numberOfPeople > 0) {
    const tipsPerPerson = tipAmount / state.numberOfPeople;
    return tipsPerPerson;
  }
  return 0;
}

function getTotalPerPerson(state) {
  const tipAmount = getTipAmount(state);
  const totalPerPerson = (state.billAmount + tipAmount) / state.numberOfPeople;

  if (state.numberOfPeople > 0) {
    return totalPerPerson;
  }

  return 0;
}

function setBill(value) {
  stateManager.billAmount = value;
}

function setTipPercentage(percent) {
  stateManager.tipPercentage = percent;
}

function setNumberOfPeople(value) {
  stateManager.numberOfPeople = value || 0;
}

function resetStateManager() {
  stateManager.billAmount = 0;
  stateManager.tipPercentage = 0;
  stateManager.numberOfPeople = 0;
}

export {
  stateManager,
  getTipAmount,
  getTipsPerPerson,
  getTotalPerPerson,
  setBill,
  setTipPercentage,
  setNumberOfPeople,
  resetStateManager,
};
