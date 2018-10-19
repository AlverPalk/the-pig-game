import { elements, status } from '../index';

export const switchPlayer = () => {
    (status.activePlayer === 1) ? status.activePlayer = 0 : status.activePlayer = 1;
};

export const calcCurrentScore = () => {
    status.currentScore += status.dice[0] + status.dice[1];
};

export const calcScore = () => {
    status.scores[status.activePlayer] += status.currentScore;
};
