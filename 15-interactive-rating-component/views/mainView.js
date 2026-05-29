function mainViewInnit () {
    console.log("mainViewInnit");
}

function removeAllCheckedClasses () {
    const labels = document.querySelectorAll('label');
    labels.forEach((label) => {
        label.classList.remove('checked');
    });
}

function applyCheckedClass (element, className) {
    element.classList.add(className);
}

export { mainViewInnit, removeAllCheckedClasses, applyCheckedClass };