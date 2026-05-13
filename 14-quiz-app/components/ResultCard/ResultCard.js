import Logo from "../Logo/Logo.js";

function ResultCard (category, score, questionArr) {
    const card = document.createElement('div');
    card.classList.add('result-card-container');

    const logoContainer = document.createElement('ul');
    logoContainer.classList.add('logo-container');
    logoContainer.setAttribute('id', 'logo-container');

    
    const scoreTitle = document.createElement('p');
    scoreTitle.classList.add('score-title');
    scoreTitle.textContent = score;

    const scoreSubtitle = document.createElement('p');
    scoreSubtitle.classList.add('score-subtitle');
    scoreSubtitle.textContent = `out of ${questionArr.length}`;

    // logoContainer.appendChild(categoryCard);
    card.appendChild(logoContainer);
    card.appendChild(scoreTitle);
    card.appendChild(scoreSubtitle);

    return card;
}

export default ResultCard;