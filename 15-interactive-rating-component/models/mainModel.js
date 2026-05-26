const rating = {
    score: null,
}

function getRating () {
    return rating.score;
}

function setRating (value) {
    rating.score = value;
}

function resetRating () {
    rating.score = null;
}

export { getRating, setRating, resetRating };