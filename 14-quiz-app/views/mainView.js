// imports
import ListItem from '../components/ListItem/ListItem.js';

// elements
const wrapper = document.getElementById('wrapper');
const header = document.getElementById('header');
const bottomSection = document.getElementById('bottom');



// functions
function mainViewInit(data, error) {
    console.log("mainViewInit");
    console.log("mainViewInit data:", data);

    if (error || data.length === 0) {
        // render message in ui: No data at this time, please try again later..
        bottomSection.innerHTML = `<p>There is no data at this time. Please refresh and try again later..</p>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    data.forEach((category) => {
        fragment.append(ListItem(category.title));
    });

    bottomSection.appendChild(fragment);
}

export { mainViewInit };