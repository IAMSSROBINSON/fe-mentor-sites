function Question (index, question, questionsArrLength) {
    return `
    <p class="question-number">Question ${index + 1} of ${questionsArrLength}</p>
    <h2 class="question">${question}</h2>
    <input id="range" class="range" type="range" min="1" max=${questionsArrLength} value=${index + 1}>
    `;
}

export default Question;