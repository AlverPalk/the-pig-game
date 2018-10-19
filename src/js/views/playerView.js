import { elements, status } from '../index';

export const renderScores = () => {
    elements.scores.forEach((el, i) => {
        document.querySelector(el).textContent = status.scores[i];
    })
};

export const renderCurrent = () => {
    elements.currents.forEach((el, i) => {
        if (i === status.activePlayer) {
            document.querySelector(elements.currents[i]).textContent = status.currentScore;
        } else {
            document.querySelector(elements.currents[i]).textContent = '0';
        }
    })
};

export const toggleActivePlayer = () => {
    document.querySelector(elements.players[status.activePlayer]).classList.toggle('active');
    document.querySelector(elements.playerPanels[status.activePlayer]).classList.toggle('active');
};

export const addActivePlayer = () => {
    document.querySelector(elements.players[status.activePlayer]).classList.add('active');
    document.querySelector(elements.playerPanels[status.activePlayer]).classList.add('active');
};

export const removoeActivePlayer = () => {
    document.querySelector(elements.players[status.activePlayer]).classList.remove('active');
    document.querySelector(elements.playerPanels[status.activePlayer]).classList.remove('active');
};

export const declareWinner = () => {
    document.querySelector(elements.players[status.activePlayer]).textContent = "Winner!";
};