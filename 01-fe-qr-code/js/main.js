import cardData from './data.js';
import Card from '../components/Card/index.js';

const root = document.getElementById("root");

const cardsFragment = document.createDocumentFragment();
cardData.forEach((cardObj) => cardsFragment.appendChild(Card(cardObj.title, cardObj.text, cardObj.imgSrc)))


root.appendChild(cardsFragment);